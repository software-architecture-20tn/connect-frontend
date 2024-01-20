import React, { useEffect, useState } from "react";
import "./CloseFriends.scss";
// import { fetchApi } from "../../api";
import ChatListItem from "../ChatList/ChatListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function CloseFriends({ className, setSidebarOpen, ...props }) {
  const [closeFriends, setCloseFriends] = useState([]);
  //   const getCloseFriendsApi = () => fetchApi.get("/users/close-friends/");
  //   useEffect(() => {
  //     const getCloseFriends = async () => {
  //       const response = await getCloseFriendsApi();
  //       const closeFriendsData = await response.json();
  //       setCloseFriends(closeFriendsData);
  //     };
  //     getCloseFriends();
  //   }, []);

  const closeFriendsList = [
    {
      id: 0,
      username: "ngu",
      first_name: "Na",
      last_name: "Haha",
      email: "user@example.com",
      date_of_birth: "2002-12-21",
      avatar: null,
    },
    {
      id: 0,
      username: "ngukkk",
      first_name: "Ne",
      last_name: "Hehe",
      email: "hehe@example.com",
      date_of_birth: "2002-10-21",
      avatar: null,
    },
    {
      id: 0,
      username: "kongu",
      first_name: "No",
      last_name: "H0h0",
      email: "kongu@example.com",
      date_of_birth: "2002-12-15",
      avatar: null,
    },
  ];
  useEffect(() => {
    setCloseFriends(closeFriendsList);
  }, []);
  console.log(closeFriends);
  return (
    <div className={`${className} close-friend`}>
      <div className="header">
        <FontAwesomeIcon
          className="back-icon"
          icon={faChevronLeft}
          onClick={() => {
            setSidebarOpen("listFriend");
          }}
        />
        <p>Your Close Friends</p>
      </div>
      <div className="close-friend__container">
        {closeFriends.map((closeFriend, index) => {
          return (
            <ChatListItem
              key={index}
              animationDelay={index + 1}
              active={closeFriend.id === 1 ? "active" : ""}
              data={closeFriend}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CloseFriends;
