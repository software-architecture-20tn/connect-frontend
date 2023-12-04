import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faAddressBook,
  faPhoneFlip,
  faBookmark,
  faUserPlus,
  faCircleQuestion,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";

import "./FriendSidebar.scss";
import ListFriend from "../ListFriend";
import Popper from "../Popper";
import { logOut } from "../../_helpers/authThunk";
import { useDebounce } from "../../hooks";
// import { fetchApi } from "../../api/auth";

const DEMO_DATA = [
  {
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/391563902_1669683473557860_9213117967026616332_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=_-p-KS0ki6cAX9bAFda&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBtBrhr00Rnolh6yt5CEcdtfJaKjS6eelrONtY3ysC-6Q&oe=657060E5",
    first_name: "Thái",
    last_name: "Vũ",
    username: "thaivu",
  },
  {
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/391563902_1669683473557860_9213117967026616332_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=_-p-KS0ki6cAX9bAFda&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBtBrhr00Rnolh6yt5CEcdtfJaKjS6eelrONtY3ysC-6Q&oe=657060E5",
    first_name: "Tùng Mậu",
    last_name: "Vũ",
    username: "tungmau",
  },
  {
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/391563902_1669683473557860_9213117967026616332_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=_-p-KS0ki6cAX9bAFda&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBtBrhr00Rnolh6yt5CEcdtfJaKjS6eelrONtY3ysC-6Q&oe=657060E5",
    first_name: "Tuyền",
    last_name: "Vũ",
    username: "vtuyen",
  },
  {
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/391563902_1669683473557860_9213117967026616332_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=_-p-KS0ki6cAX9bAFda&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBtBrhr00Rnolh6yt5CEcdtfJaKjS6eelrONtY3ysC-6Q&oe=657060E5",
    first_name: "Phú",
    last_name: "Minh",
    username: "mpt",
  },
  {
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/391563902_1669683473557860_9213117967026616332_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=_-p-KS0ki6cAX9bAFda&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBtBrhr00Rnolh6yt5CEcdtfJaKjS6eelrONtY3ysC-6Q&oe=657060E5",
    first_name: "Le Thi",
    last_name: "Quynh",
    username: "ttQuanh",
  },
  {
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/391563902_1669683473557860_9213117967026616332_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=_-p-KS0ki6cAX9bAFda&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBtBrhr00Rnolh6yt5CEcdtfJaKjS6eelrONtY3ysC-6Q&oe=657060E5",
    first_name: "Hieu",
    last_name: "Nguyen",
    username: "nghi",
  },
  {
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/391563902_1669683473557860_9213117967026616332_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=_-p-KS0ki6cAX9bAFda&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfBtBrhr00Rnolh6yt5CEcdtfJaKjS6eelrONtY3ysC-6Q&oe=657060E5",
    first_name: "Toàn",
    last_name: "Huynh Thi",
    username: "htp",
  },
];

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: "Setting",
    type: "setting",
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
    icon: <FontAwesomeIcon icon={faUserPlus} />,
    title: "Invite Friends",
    type: "invite-friends",
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

function FriendSidebar({ className, ...props }) {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://chat-app.nguyenvanloc.name.vn/api/users/friends/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setListData(DEMO_DATA);
        setListFilter(DEMO_DATA);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "logout":
        logOut();
        navigate("/login");
        props.handleIsLogin(false);
        break;
      default:
    }
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setListFilter(listData);
      return;
    }
    const filtered = listData.filter(
      (friend) =>
        friend.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        friend.last_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchValue.toLowerCase()),
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
        <ListFriend ListData={listFilter} />
      ) : (
        <p>Don&apos;t have friend</p>
      )}
    </div>
  );
}

export default FriendSidebar;
