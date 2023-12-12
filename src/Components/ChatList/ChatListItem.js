import React from "react";
import "./ChatList.scss";
import Avatar from "./Avatar";

function ChatListItem({ data, active, isOnline, animationDelay, ...props }) {
  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      // onClick={this.selectChat}
      className={`chatlist__item ${active ? "active" : ""}`}
    >
      <Avatar
        image={data.avatar !== null ? data.avatar : "http://placehold.it/80x80"}
        isOnline={isOnline}
      />

      <div className="userMeta">
        <p>{`${data.first_name} ${data.last_name}`}</p>
        {/* <span className="activeTime">32 mins ago</span> */}
        <span className="activeTime">{data.username}</span>
      </div>
    </div>
  );
}

export default ChatListItem;
