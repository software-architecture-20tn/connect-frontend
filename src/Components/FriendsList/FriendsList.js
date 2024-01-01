import React from "react";
import "tippy.js/dist/tippy.css";

import "./FriendsList.scss";
import ChatListItem from "./FriendsListItem";

function FriendsList({ ListData, className, ...props }) {
  return (
    <div className="friendslist__items">
      {ListData.map((item, index) => {
        return (
          <ChatListItem
            key={index}
            animationDelay={index + 1}
            active={item.id === 1 ? "active" : ""}
            isOnline={item.isOnline ? "active" : ""}
            data={item}
            addFriend={props.addFriend}
          />
        );
      })}
    </div>
  );
}

export default FriendsList;
