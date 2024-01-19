import React from "react";
import "tippy.js/dist/tippy.css";

import "./ChatList.scss";
import ChatListItem from "./ChatListItem";

function ChatList({ ListData, className, ...props }) {
  const handleActive = (item) => {
    if (props.infoChatContent.receiver) {
      return (
        props.infoChatContent.receiver.id === item.receiver ||
        props.infoChatContent.receiver.id === item.sender
      );
    }

    return false;
  };
  return (
    <div className="chatlist__items">
      {ListData.map((item, index) => {
        return (
          <ChatListItem
            key={index}
            animationDelay={index + 1}
            active={handleActive(item) ? "active" : ""}
            isOnline={item.isOnline ? "active" : ""}
            data={item}
            setInfoChatContent={props.setInfoChatContent}
            infoChatContent={props.infoChatContent}
          />
        );
      })}
    </div>
  );
}

export default ChatList;
