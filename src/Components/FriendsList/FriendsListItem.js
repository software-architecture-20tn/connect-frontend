import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FriendsList.scss";
import Avatar from "./Avatar";
import { fetchApi } from "../../api";

function FriendsListItem({ data, active, isOnline, animationDelay, ...props }) {
  const handleAddFriend = async (data) => {
    const dataRequest = {
      receiver: data.id,
    };

    const addFriend = () =>
      fetchApi.post("/users/friend-requests/", dataRequest);

    try {
      const response = await addFriend(dataRequest);
      const dataResponse = await response.json();
      if (dataResponse.id) {
        toast.success("Send successful!", {
          position: "top-right",
          autoClose: 1000,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(dataResponse.receiver[0], {
          position: "top-right",
          autoClose: 1000,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error("Some error!", {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChooseChatContent = () => {
    props.setInfoChatContent((prev) => ({
      ...prev,
      receiver: {
        ...data,
        conversation_name: data.username,
      },
    }));
  };

  return (
    <>
      <div
        style={{ animationDelay: `0.${animationDelay}s` }}
        // onClick={this.selectChat}
        className={`friendslist__item ${active ? "active" : ""}`}
        onClick={props.infoChatContent && handleChooseChatContent}
      >
        <Avatar
          image={
            data.avatar !== null ? data.avatar : "http://placehold.it/80x80"
          }
          isOnline={isOnline}
        />

        <div className="userMeta">
          <p>{`${data.first_name} ${data.last_name}`}</p>
          {/* <span className="activeTime">32 mins ago</span> */}
          <span className="activeTime">{data.username}</span>
        </div>

        {props.addFriend && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-circle search-add-icon add-friend-icon"
            viewBox="0 0 16 16"
            onClick={() => handleAddFriend(data)}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        )}
      </div>
    </>
  );
}

export default FriendsListItem;
