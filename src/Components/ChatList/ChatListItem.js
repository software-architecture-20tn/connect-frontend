import React from "react";
import { fetchApi } from "../../api";
import "./ChatList.scss";
import Avatar from "./Avatar";

function ChatListItem({ data, active, isOnline, animationDelay, ...props }) {
  const getReceiverInfo = (id) => fetchApi.get(`/users/friends/${id}/`, "");
  const handleChooseChatContent = () => {
    if (data.receiver) {
      const receiverId =
        props.infoChatContent.sender.id === data.sender
          ? data.receiver
          : data.sender;

      const handleGetReceiverInfo = async () => {
        const response = await getReceiverInfo(receiverId);
        if (response.status === 401) {
          console.log(response);
        }
        const receiverInfo = await response.json();
        props.setInfoChatContent((prev) => ({
          ...prev,
          receiver: {
            ...receiverInfo,
            conversation_name: data.conversation_name,
          },
        }));
      };

      handleGetReceiverInfo();
    } else {
      const receiverInfo = {
        group: data.group,
        avatar: data.avatar,
        conversation_name: data.conversation_name,
      };
      props.setInfoChatContent((prev) => ({
        ...prev,
        receiver: receiverInfo,
      }));
    }
  };
  return (
    <>
      <div
        style={{ animationDelay: `0.${animationDelay}s` }}
        // onClick={this.selectChat}
        className={`chatlist__item ${active ? "active" : ""}`}
        onClick={handleChooseChatContent}
      >
        <Avatar
          image={
            !data.avatar
              ? "http://placehold.it/80x80"
              : data.avatar.startsWith("/media")
              ? `${process.env.REACT_APP_MEDIA_URL}${data.avatar}`
              : data.avatar
          }
          isOnline={isOnline}
        />

        <div className="userMeta">
          <p>{`${data.conversation_name}`}</p>
          {/* <span className="activeTime">32 mins ago</span> */}
          <span className="activeTime">{data.content}</span>
        </div>
      </div>
    </>
  );
}

export default ChatListItem;
