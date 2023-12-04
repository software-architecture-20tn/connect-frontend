import React from "react";
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
];

function ChatContent({ className, ...props }) {
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
      <div className="content__body">
        <div className="chat__items">
          {DEMO_DATA.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
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
            // onChange={this.onStateChange}
            // value={this.state.msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
