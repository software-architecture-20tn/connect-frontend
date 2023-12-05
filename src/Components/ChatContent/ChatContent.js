import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";
import "./ChatContent.scss";

const DEMO_DATA = [
  {
    key: 1,
    image:
      "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    type: "",
    msg: "Hi Tim, How are you?",
  },
  {
    key: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "I am fine.",
  },
  {
    key: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "What about you?",
  },
  {
    key: 4,
    image:
      "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    type: "",
    msg: "Awesome these days.",
  },
  {
    key: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "Finally. What's the plan?",
  },
  {
    key: 6,
    image:
      "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    type: "",
    msg: "what plan mate?",
  },
  {
    key: 7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "I'm taliking about the tutorial",
  },
  {
    key: 8,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "I am fine.",
  },
  {
    key: 9,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "What about you?",
  },
  {
    key: 10,
    image:
      "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    type: "",
    msg: "Awesome these days.",
  },
  {
    key: 11,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "Finally. What's the plan?",
  },
  {
    key: 12,
    image:
      "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    type: "",
    msg: "what plan mate?",
  },
  {
    key: 13,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "I'm taliking about the tutorial",
  },
];

function ChatContent({ className, ...props }) {
  const messagesRef = useRef(null);
  const [contentMessage, setContentMessage] = useState(DEMO_DATA);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Scroll");
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [contentMessage]);

  const handleKeyPress = (e) => {
    // Khi nhấn phím "Enter"
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        key: 1,
        image:
          "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
        type: "",
        msg: message,
      };
      setContentMessage((prev) => [...prev, newMessage]);
    }
    setMessage("");
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
            />
            <p>Tim Hover</p>
          </div>
        </div>
      </div>
      <div className="content__body" ref={messagesRef}>
        <div className="chat__items">
          {contentMessage.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={index}
                user={itm.type ? itm.type : "me"}
                msg={itm.msg}
                image={itm.image}
              />
            );
          })}
          <div ref={null} />
        </div>
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
  );
}

export default ChatContent;
