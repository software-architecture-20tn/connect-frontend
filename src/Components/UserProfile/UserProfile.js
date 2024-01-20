import React from "react";
import {
  faXmark,
  faAt,
  faEnvelope,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../Avatar";
import "./UserProfile.scss";
function UserProfile({ open, setOpen, ...props }) {
  const user = {
    id: 0,
    first_name: "Ngu",
    last_name: "Hehe",
    email: "user@example.com",
    date_of_birth: "2023-12-22",
    avatar:
      "https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg",
    username: "nguhehe",
  };
  return (
    <Drawer
      className="user-profile"
      variant="persistent"
      anchor="right"
      open={open}
    >
      <div className="user-profile__header">
        <FontAwesomeIcon
          className="exit-icon"
          icon={faXmark}
          onClick={() => {
            setOpen(false);
          }}
        />
        <p>Profile</p>
      </div>
      <div className="user-profile__body">
        <Avatar src={user.avatar} />
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        <div className="user-profile__body__info">
          <div>
            <FontAwesomeIcon icon={faAt} className="info-icon" />
            <span className="info-text">{user.username}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
            <span className="info-text">{user.email}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faCalendarDays} className="info-icon" />
            <span className="info-text">{user.date_of_birth}</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default UserProfile;
