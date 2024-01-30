import React, { useState, useEffect, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { fetchApi } from "../../api";
import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";
import "./ChatContent.scss";

function ChatContent({ className, setModalOpen, ...props }) {
  const getChatContent = (apiGetContent) => {
    return fetchApi.get(apiGetContent, "");
  };
  const sendDirectMessages = (dataRequest) => {
    return fetchApi.post("/conversations/direct-messages/create/", dataRequest);
  };
  const sendGroupMessages = (dataRequest) => {
    return fetchApi.post("/conversations/group-messages/create/", dataRequest);
  };
  const messagesRef = useRef(null);
  const [contentMessage, setContentMessage] = useState(null);
  const [message, setMessage] = useState("");

  // Load Start Chat Content
  const loadStartChatContent = async () => {
    if (props.infoChatContent.receiver === null) {
      return;
    }
    if (!props.infoChatContent.receiver.group) {
      const receiverId =
        props.infoChatContent.receiver && props.infoChatContent.receiver.id;
      if (receiverId) {
        const response = await getChatContent(
          `/conversations/direct-messages/${receiverId}/?limit=8&offset=0`,
        );
        const data = await response.json();
        setContentMessage({
          count: data.count,
          results: data.results,
        });
      }
    } else {
      console.log(props.infoChatContent.receiver);
      const response = await getChatContent(
        `/conversations/group-messages/${props.infoChatContent.receiver.group}/?limit=8&offset=0`,
      );
      const data = await response.json();
      setContentMessage({
        count: data.count,
        results: data.results,
      });
    }
  };
  useEffect(() => {
    loadStartChatContent();
  }, [props.infoChatContent.receiver]);

  // Handle when update messages
  const fetchChatContent = useMemo(() => {
    if (props.infoChatContent.receiver === null) {
      return;
    }
    if (!props.infoChatContent.receiver.group) {
      const receiverId =
        props.infoChatContent.receiver && props.infoChatContent.receiver.id;
      const curID =
        contentMessage &&
        contentMessage.count > 0 &&
        contentMessage.results[0].id;
      return async () => {
        if (receiverId) {
          const response = await getChatContent(
            `/conversations/direct-messages/${receiverId}/?limit=8&offset=0`,
          );
          const data = await response.json();
          // setApiGetOldContent(data.next);
          if (contentMessage !== null && curID) {
            const idxSmaller = data.results.findIndex(
              (item) => item.id <= curID,
            );
            if (data.results.slice(0, idxSmaller).length > 0) {
              setContentMessage((prev) => {
                return {
                  count: data.count,
                  results: [
                    ...data.results.slice(0, idxSmaller),
                    ...prev.results,
                  ],
                };
              });
            }
          } else {
            setContentMessage({
              count: data.count,
              results: data.results,
            });
          }
        }
      };
    } else {
      const groupId =
        props.infoChatContent.receiver && props.infoChatContent.receiver.group;
      const curID = contentMessage && contentMessage.results[0].id;
      return async () => {
        if (groupId) {
          const response = await getChatContent(
            `/conversations/group-messages/${groupId}/?limit=8&offset=0`,
          );
          const data = await response.json();
          // setApiGetOldContent(data.next);
          if (contentMessage !== null) {
            const idxSmaller = data.results.findIndex(
              (item) => item.id <= curID,
            );
            if (data.results.slice(0, idxSmaller).length > 0) {
              setContentMessage((prev) => {
                return {
                  count: data.count,
                  results: [
                    ...data.results.slice(0, idxSmaller),
                    ...prev.results,
                  ],
                };
              });
            }
          } else {
            setContentMessage({
              count: data.count,
              results: data.results,
            });
          }
        }
      };
    }
  }, [props.infoChatContent, contentMessage]);

  useEffect(() => {
    if (messagesRef.current && contentMessage) {
      if (messagesRef.current.scrollTop === 0) {
        messagesRef.current.scrollTop = 0;
      } else if (
        messagesRef.current.scrollHeight - messagesRef.current.scrollTop <=
        830
      ) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      } else if (
        props.infoChatContent.sender.id === contentMessage.results[0].sender
      ) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }
  }, [props.infoChatContent.receiver, messagesRef.current, contentMessage]);

  useEffect(() => {
    const handleLoop = () => {
      fetchChatContent !== undefined && fetchChatContent();
    };
    const intervalId = setInterval(handleLoop, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchChatContent]);

  // Handle load old chat
  const loadOldChatContent = async (offset, curID) => {
    if (!props.infoChatContent.receiver.group) {
      const receiverId = props.infoChatContent.receiver.id;
      const response = await getChatContent(
        `/conversations/direct-messages/${receiverId}/?limit=8&offset=${offset}`,
      );
      const data = await response.json();
      const idxSmaller = data.results.findIndex((item) => item.id < curID);
      setContentMessage((prev) => {
        return {
          count: data.count,
          results: [...prev.results, ...data.results.slice(idxSmaller)],
        };
      });
    } else {
      const groupId = props.infoChatContent.receiver.group;
      const response = await getChatContent(
        `/conversations/group-messages/${groupId}/?limit=8&offset=${offset}`,
      );
      const data = await response.json();
      const idxSmaller = data.results.findIndex((item) => item.id < curID);
      setContentMessage((prev) => {
        return {
          count: data.count,
          results: [...prev.results, ...data.results.slice(idxSmaller)],
        };
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = messagesRef.current.scrollTop;
      if (
        scrollTop === 0 &&
        contentMessage.results.length < contentMessage.count
      ) {
        loadOldChatContent(
          contentMessage.results.length,
          contentMessage.results[contentMessage.results.length - 1].id,
        );
      }
    };

    const scrollDiv = messagesRef.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messagesRef.current, contentMessage]);

  // Handle Send Message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      if (props.infoChatContent.receiver.group) {
        const newMessage = {
          sender: props.infoChatContent.sender.id,
          group: props.infoChatContent.receiver.group,
          content: message.trim(),
          media: null,
        };
        const response = await sendGroupMessages(newMessage);
        await response.json();
      } else {
        const newMessage = {
          sender: props.infoChatContent.sender.id,
          receiver: props.infoChatContent.receiver.id,
          content: message.trim(),
          media: null,
        };
        const response = await sendDirectMessages(newMessage);
        await response.json();
      }
      // setContentMessage((prev) => [...prev, newMessage]);
    }
    setMessage("");
  };

  const mainContent = useMemo(() => {
    const contentRender =
      contentMessage !== null ? [...contentMessage.results].reverse() : null;
    return (
      <div className="chat__items">
        {contentRender !== null &&
          contentRender.map((item, index) => {
            const user =
              item.sender === props.infoChatContent.sender.id ? "me" : "other";
            const image =
              item.sender === props.infoChatContent.sender.id
                ? props.infoChatContent.sender.avatar
                : item.sender_avatar &&
                  `${process.env.REACT_APP_MEDIA_URL}${item.sender_avatar}`;
            console.log(image);
            return (
              <ChatItem
                animationDelay={index + 2}
                key={index}
                user={user}
                msg={item.content}
                image={image !== null ? image : "http://placehold.it/80x80"}
                sendAt={item.time}
                senderName={
                  item.sender_first_name !== undefined &&
                  item.sender_last_name !== undefined &&
                  `${item.sender_first_name} ${item.sender_last_name}`
                }
              />
            );
          })}
        <div ref={null} />
      </div>
    );
  }, [contentMessage]);

  return (
    <div className="main__chatcontent">
      {props.infoChatContent.receiver === null ? (
        <div className="content__empty">
          Please select a chat to start messaging
        </div>
      ) : (
        <div>
          <div className="content__header">
            <div className="blocks">
              <div
                className="current-chatting-user"
                onClick={() => setModalOpen(true)}
              >
                <Avatar
                  isOnline="active"
                  image={
                    props.infoChatContent.receiver.avatar !== null
                      ? props.infoChatContent.receiver.avatar
                      : "http://placehold.it/80x80"
                  }
                />
                <p>{`${props.infoChatContent.receiver.conversation_name}`}</p>
              </div>
            </div>
          </div>
          <div className="content__body" ref={messagesRef}>
            {mainContent}
          </div>
          <div className="content__footer">
            <div className="sendNewMessage">
              {/* <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button> */}
              <input
                type="text"
                placeholder="Type a message here"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
                onKeyPress={handleKeyPress}
              />
              <button
                className="btnSendMsg"
                id="sendMsgBtn"
                onClick={handleSendMessage}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContent;
