import React, { useEffect, useRef, useState } from "react";
import { Modal, Fade } from "@mui/material";
import { fetchApi } from "../../api";
import Avatar from "../Avatar";
import SearchUserWidget from "../SearchUserWidget";
import MyButton from "../MyButton";
import LoadingSpinner from "../LoadingSpinner";
import "./GroupMemberModal.scss";
import { toast } from "react-toastify";
function GroupMemberModal({
  groupModalOpen,
  setGroupModalOpen,
  className,
  infoChatContent,
  ...props
}) {
  const containerRef = useRef(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memberChange, setMemberChange] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  useEffect(() => {
    containerRef.current = document.getElementsByClassName("home")[0];
  }, []);

  useEffect(() => {
    if (groupModalOpen) {
      const getMembersInGroup = async () => {
        // console.log("info chat content", infoChatContent);
        const response = await fetchApi.get(
          `/conversations/groups/${infoChatContent.receiver.group}/`,
        );
        const groupData = await response.json();
        setGroupMembers(groupData.members);
      };
      try {
        getMembersInGroup();
      } catch (e) {
        console.log(e);
      }
    }
  }, [groupModalOpen, memberChange]);
  const handleClose = () => setGroupModalOpen(false);
  const handleRemove = async (id) => {
    const requestBody = {
      members_ids: [id],
    };
    console.log("request body", requestBody);
    const removeMemberApi = () =>
      fetchApi.post(
        `/conversations/groups/${infoChatContent.receiver.group}/remove-members/`,
        requestBody,
      );
    try {
      setIsLoading(true);
      setBtnDisabled(true);
      const response = await removeMemberApi();
      const responseMsg = await response.json();
      if (response.ok) {
        if (id === infoChatContent.sender.id) {
          window.location.reload();
        } else {
          setMemberChange(!memberChange);
        }
      } else {
        toast.error(responseMsg, {
          position: "top-right",
          autoClose: 1000,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      console.log(responseMsg);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  // const handleOpen = () => setGroupModalOpen(true);
  console.log("gms", groupMembers);
  return (
    <div className={`group-modal ${className}`} {...props}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={groupModalOpen}
        onClose={handleClose}
        closeAfterTransition
        className={`group-modal__container`}
        container={containerRef.current}
      >
        <Fade in={groupModalOpen}>
          <div className={`group-modal__content`}>
            {isLoading && <LoadingSpinner />}
            <h2 id="transition-modal-title">Group Members</h2>
            <SearchUserWidget
              groupId={infoChatContent.receiver.group}
              memberChanged={memberChange}
              setMemberChanged={setMemberChange}
            />
            <div className="group-modal__content__members">
              {groupMembers.map((item, index) => {
                return (
                  <div
                    className="group-modal__content__members__member"
                    key={index}
                  >
                    <div className="user-info">
                      <Avatar
                        src={
                          item.avatar &&
                          `${process.env.REACT_APP_MEDIA_URL}${item.avatar}`
                        }
                      />
                      <p>
                        {item.first_name} {item.last_name}
                      </p>
                    </div>
                    <MyButton
                      className="bttn"
                      text={
                        item.id === infoChatContent.sender.id
                          ? "Leave"
                          : "Remove"
                      }
                      onClick={() => handleRemove(item.id)}
                      disabled={btnDisabled}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default GroupMemberModal;
