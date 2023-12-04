import React from "react";
import "./Friend.scss";
function Friend({ className, data, ...props }) {
  return (
    <div className="wrapper">
      <img src={data.image} className="avatar"></img>
      <div className="item-info">
        <p className="name">{`${data.last_name} ${data.first_name}`}</p>
        <p className="user-name">{data.username}</p>
      </div>
    </div>
  );
}

export default Friend;
