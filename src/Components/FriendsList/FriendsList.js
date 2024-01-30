import React from "react";
import "tippy.js/dist/tippy.css";

import "./FriendsList.scss";
import ChatListItem from "./FriendsListItem";

function FriendsList({ ListData, className, ...props }) {
  const handleActive = (item) => {
    if (props.infoChatContent && props.infoChatContent.receiver) {
      return props.infoChatContent.receiver.id === item.id;
    }

    return false;
  };
  return (
    <div className="friendslist__items">
      {ListData.map((item, index) => {
        return (
          <ChatListItem
            key={index}
            animationDelay={index + 1}
            active={handleActive(item) ? "active" : ""}
            isOnline={item.isOnline ? "active" : ""}
            data={item}
            addFriend={props.addFriend}
            setInfoChatContent={props.setInfoChatContent}
            infoChatContent={props.infoChatContent}
          />
        );
      })}
    </div>
  );
}

export default FriendsList;
