import React from "react";
import Avatar from "../ChatList/Avatar";

function ChatItem({ msg, animationDelay, user, image, sendAt, senderName }) {
  const targetDate = new Date(sendAt);
  const currentDate = new Date();
  if (targetDate.getDate() === currentDate.getDate()) {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedTargetDate = formatter.format(targetDate);
    sendAt = formattedTargetDate;
  } else {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedTargetDate = formatter.format(targetDate);
    // Nếu là ngày hôm trước, thêm thông tin ngày vào
    sendAt = formattedTargetDate;
  }
  console.log("undefined ", senderName);
  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      className={`chat__item ${user === "other" ? user : ""} `}
    >
      <div className="chat__item__content">
        <div className="chat__sender">
          {senderName !== undefined ? senderName : ""}
        </div>
        <div className="chat__msg">{msg}</div>
        <div className="chat__meta">
          <span>{sendAt}</span>
          {/* <span>Seen 1.03PM</span> */}
        </div>
      </div>
      <Avatar isOnline="active" image={image} />
    </div>
  );
}

export default ChatItem;
