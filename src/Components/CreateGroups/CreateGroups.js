import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "tippy.js/dist/tippy.css";
import Multiselect from "multiselect-react-dropdown";

import "./CreateGroups.scss";
import { useDebounce } from "../../hooks";
import { fetchApi } from "../../api";

function CreateGroups({ className, setSidebarOpen, ...props }) {
  const getListFriends = () => fetchApi.get("/users/friends/");
  const createGroups = (data) => fetchApi.post("/conversations/groups/", data);
  const sendFirstMessage = (data) =>
    fetchApi.post("/conversations/group-messages/create/", data);
  const [listFriends, setListFriends] = useState([]);
  const [options, setOptions] = useState([]);
  const [addFriends, setAddFriends] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [groupName, setGroupName] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const handleGetFriends = async () => {
      const res = await getListFriends();
      const data = await res.json();
      setListFriends(data);
    };

    handleGetFriends();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setOptions([]);
    }
  }, [searchValue]);

  const handleFindFriends = async () => {
    const formatData = listFriends
      .filter((item) => {
        if (
          item.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.last_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.email.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          return true;
        }
        return false;
      })
      .map((item) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
      }));
    setOptions(formatData);
  };

  useEffect(() => {
    if (!debouncedValue || !debouncedValue.trim()) {
      return;
    }
    handleFindFriends();
  }, [debouncedValue]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!groupName || !groupName.trim()) {
      toast.error("Group name cannot be empty", {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (addFriends.length === 0) {
      toast.error("Need to add users to the group", {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const data = {
        name: groupName,
        friend_ids: addFriends.map((item) => item.id),
      };
      const response = await createGroups(data);
      const resJson = await response.json();
      if (resJson) {
        const handleSendFirstMessage = async () => {
          const firstMessage = {
            sender: resJson.members[0].id,
            group: resJson.id,
            content: `Chào mừng mọi người vào nhóm ${groupName}`,
          };

          const resSendMessage = await sendFirstMessage(firstMessage);
          await resSendMessage.json();
        };
        handleSendFirstMessage();
        setSidebarOpen("listChats");
      }
    }
  };

  const handleInputGroupName = (e) => {
    const valueInput = e.target.value;
    setGroupName(valueInput);
  };

  const onSelect = (selectedList) => {
    setAddFriends(selectedList);
    setOptions([]);
  };

  const onRemove = (selectedList) => {
    setAddFriends(selectedList);
    setOptions([]);
  };

  return (
    <div className="createGroups-wrapper">
      <div className="header">
        <FontAwesomeIcon
          className="back-icon"
          icon={faChevronLeft}
          onClick={() => {
            setSidebarOpen("listChats");
          }}
        />
        <p>Create Groups</p>
      </div>
      <form className="createGroup-box" onSubmit={handleSubmitForm}>
        <label>
          <input
            type="text"
            placeholder="Group Name"
            className="search-input"
            value={groupName}
            onChange={handleInputGroupName}
          />
        </label>
        <Multiselect
          options={options}
          selectedValues={() => {
            console.log("Show value");
          }}
          onSelect={onSelect}
          onRemove={onRemove}
          onSearch={(e) => setSearchValue(e)}
          displayValue="name"
          closeOnSelect={false}
          emptyRecordMsg={null}
          placeholder="Add users"
        />
        <button className="button">Create Group</button>
      </form>
    </div>
  );
}

export default CreateGroups;
