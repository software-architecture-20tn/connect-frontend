import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAddressBook,
  faPhoneFlip,
  faBookmark,
  faUserPlus,
  faCircleQuestion,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";

import "./ChatSidebar.scss";
import ChatList from "../ChatList";
import Popper from "../Popper";
import { logOut } from "../../_helpers/authThunk";
import { useDebounce } from "../../hooks";
import { fetchApi } from "../../api";
// import { DEMO_DATA } from "../../utils/DemoData";

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "Profile",
    type: "Profile",
  },
  {
    icon: <FontAwesomeIcon icon={faUserPlus} />,
    title: "Find Friends",
    type: "findFriends",
  },
  {
    icon: <FontAwesomeIcon icon={faAddressBook} />,
    title: "Contacts",
    type: "contacts",
  },
  {
    icon: <FontAwesomeIcon icon={faPhoneFlip} />,
    title: "Calls",
    type: "calls",
  },
  {
    icon: <FontAwesomeIcon icon={faBookmark} />,
    title: "Save messages",
    type: "save-messages",
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Telegram FAQ",
    type: "faq",
  },
  {
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    title: "Logout",
    type: "logout",
  },
];

function ChatSidebar({ className, ...props }) {
  const getListChats = () => fetchApi.get("/conversations/conversations/");
  const [listData, setListData] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await getListChats();
      const data = await response.json();
      setListData(data);
      setListFilter(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const checkMessages = async () => {
      fetchData();
    };

    fetchData();
    const intervalId = setInterval(checkMessages, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "Profile":
        props.setSidebarOpen("profile");
        break;
      case "findFriends":
        props.setSidebarOpen("findFriends");
        break;
      case "logout":
        dispatch(logOut());
        // navigate("/login");
        break;
      default:
    }
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setListFilter(listData);
      return;
    }
    const filtered = listData.filter((friend) =>
      friend.conversation_name
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    );
    setListFilter(filtered);
  }, [debouncedValue]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div className="sidebar-wrapper">
      <div className="header">
        <p>Telegram</p>
        <Popper items={MENU_ITEMS} onChange={handleMenuChange}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-list toggle-button"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </Popper>
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
          placeholder="search friend"
          className="search-input"
          value={searchValue}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-plus-circle search-add-icon"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </div>
      {listData.length > 0 ? (
        <ChatList
          ListData={listFilter}
          infoChatContent={props.infoChatContent}
          setInfoChatContent={props.setInfoChatContent}
        />
      ) : (
        <p>Don&apos;t have friend</p>
      )}
    </div>
  );
}

export default ChatSidebar;
