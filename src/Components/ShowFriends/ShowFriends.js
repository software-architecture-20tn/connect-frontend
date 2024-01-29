import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";

import "./ShowFriends.scss";
import FriendsList from "../FriendsList";
import { useDebounce } from "../../hooks";
import { fetchApi } from "../../api";

function ShowFriends({ className, setSidebarOpen, ...props }) {
  const [listFriends, setListFriends] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  const handleGetFriends = async () => {
    const getFriends = () => fetchApi.get(`/users/friends/`);
    try {
      const response = await getFriends();
      const data = await response.json();
      setListFriends(data);
      setListFilter(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetFriends();
  }, []);

  useEffect(() => {
    if (!debouncedValue || !debouncedValue.trim()) {
      setListFilter(listFriends);
      return;
    }
    const filtered = listFriends.filter((friend) => {
      const sFind = `${friend.first_name} + ${friend.last_name} + ${friend.email}`;
      return sFind.toLowerCase().includes(searchValue.toLowerCase());
    });
    setListFilter(filtered);
  }, [debouncedValue]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div className="findfriend-wrapper">
      <div className="header">
        <FontAwesomeIcon
          className="back-icon"
          icon={faChevronLeft}
          onClick={() => {
            setSidebarOpen("listChats");
          }}
        />
        <p>List Friends</p>
      </div>
      <div className="search-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-search search-icon"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input
          type="text"
          placeholder="find friends"
          className="search-input"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      {listFilter.length > 0 ? (
        <FriendsList
          ListData={listFilter}
          infoChatContent={props.infoChatContent}
          setInfoChatContent={props.setInfoChatContent}
        />
      ) : (
        <p>No friends</p>
      )}
    </div>
  );
}

export default ShowFriends;
