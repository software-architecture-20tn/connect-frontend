import React from "react";
import "./ChatList.scss";

function Avatar({ image, isOnline, ...props }) {
  return (
    <div className="avatar-chatlist">
      <div className="avatar-img">
        <img src={image} alt="#" />
      </div>
      {/* <span className={`isOnline ${isOnline}`}></span> */}
    </div>
  );
}

export default Avatar;
