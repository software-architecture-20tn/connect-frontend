import React from "react";
import "./ListFriend.scss";
import Friend from "../Friend/Friend";
function ListFriend({ className, ListData, ...props }) {
  return (
    <div className="list-friend-wrapper">
      {ListData.map((data, idx) => (
        <Friend key={idx} data={data} />
      ))}
    </div>
  );
}

export default ListFriend;
