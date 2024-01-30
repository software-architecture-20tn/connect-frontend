import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks";
import Multiselect from "multiselect-react-dropdown";
import MyButton from "../MyButton";
import { fetchApi } from "../../api";
import LoadingSpinner from "../LoadingSpinner";
import "./SearchUserWidget.scss";
function SearchUserWidget({
  className,
  groupId,
  memberChanged,
  setMemberChanged,
  ...props
}) {
  const getListFriends = () => fetchApi.get("/users/friends/");
  const [listFriends, setListFriends] = useState([]);
  const [options, setOptions] = useState([]);
  const [addFriends, setAddFriends] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSelect = (selectedList) => {
    setAddFriends(selectedList);
    setOptions([]);
  };

  const onRemove = (selectedList) => {
    setAddFriends(selectedList);
    setOptions([]);
  };

  const addMember = async () => {
    const requestBody = {
      members_ids: addFriends.map((item) => item.id),
    };
    const addMemberApi = () =>
      fetchApi.post(
        `/conversations/groups/${groupId}/add-members/`,
        requestBody,
      );
    try {
      setIsLoading(true);
      const response = await addMemberApi();
      const data = await response.json();
      if (response.ok) {
        setMemberChanged((memberChanged) => !memberChanged);
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`search-user ${className}`}>
      {isLoading && <LoadingSpinner />}
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
        className={`search-user__multiselect ${isLoading ? "blur" : ""}`}
        {...props}
      />
      <MyButton onClick={addMember} text="Add user" />
    </div>
  );
}

export default SearchUserWidget;
