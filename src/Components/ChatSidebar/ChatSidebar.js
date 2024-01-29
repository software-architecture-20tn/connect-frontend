import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setFriendRequests } from "../../_store/friendRequestsSlice";
import {
  faUser,
  faUserGroup,
  faPhoneFlip,
  faBookmark,
  faUserPlus,
  faCircleQuestion,
  faArrowRightFromBracket,
  faEnvelopeOpenText,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";
import FriendRequestsNoti from "../FriendRequestsNoti/FriendRequestsNoti";
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
    icon: <FontAwesomeIcon icon={faAddressBook} />,
    title: "List Friends",
    type: "listFriends",
  },
  {
    icon: <FontAwesomeIcon icon={faUserPlus} />,
    title: "Find Users",
    type: "findUsers",
  },
  {
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    title: "Create Groups",
    type: "createGroups",
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
    title: "The Connect FAQ",
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
  const getFriendRequests = () =>
    fetchApi.get("/users/friend-requests/?limit=5&offset=0");
  const [listData, setListData] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const [anchor, setAnchor] = useState(null);
  const dispatch = useDispatch();
  const listFriendRequest = useSelector(
    (state) => state.friendRequests.friendRequests,
  );
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
    const fetchFriendRequests = async () => {
      try {
        const response = await getFriendRequests();
        const data = await response.json();
        dispatch(setFriendRequests(data.results));
      } catch (error) {
        console.log("Error fetching friend requests: ", error);
      }
    };
    fetchFriendRequests();
    fetchData();
    const intervalId = setInterval(checkMessages, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, listFriendRequest]);

  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "Profile":
        props.setSidebarOpen("profile");
        break;
      case "listFriends":
        props.setSidebarOpen("listFriends");
        break;
      case "findUsers":
        props.setSidebarOpen("findUsers");
        break;
      case "createGroups":
        props.setSidebarOpen("createGroups");
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
  const handleFriendRequestsClick = (e) => {
    setAnchor(anchor ? null : e.currentTarget);
  };
  return (
    <div className="sidebar-wrapper">
      <div className="header">
        <p>The Connect</p>
        <div className="icons">
          <div>
            <FontAwesomeIcon
              className="friend-requests-icon"
              icon={faEnvelopeOpenText}
              onClick={handleFriendRequestsClick}
            />
            {listFriendRequest.length > 0 && (
              <div className="notification-dot"></div>
            )}
            <FriendRequestsNoti
              friendRequestList={listFriendRequest}
              open={anchor !== null}
              anchor={anchor}
            />
          </div>
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
          placeholder="find conversations"
          className="search-input"
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      {listData.length > 0 ? (
        <ChatList
          ListData={listFilter}
          infoChatContent={props.infoChatContent}
          setInfoChatContent={props.setInfoChatContent}
        />
      ) : (
        <p>Your conversations will appear here</p>
      )}
    </div>
  );
}

export default ChatSidebar;
