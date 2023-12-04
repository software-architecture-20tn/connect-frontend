import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import MyTextField from "../../../Components/MyTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import MyButton from "../../../Components/MyButton/MyButton";
import { fetchApi } from "../../../api";
import Avatar from "../../../Components/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { logOut } from "../../../_helpers/authThunk";
import "./Profile.scss";

function Profile({ user }) {
  const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    bio: yup.string().max(256, "Bio should not exceed 256 characters"),
    username: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Username should not contain space and special characters",
      )
      .required("Username should not be left blank"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const saveUserInfo = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    formData.append("avatar", avatarFile);
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const putUserInfo = () => fetchApi.put("/users/me/", formData);
      const response = await putUserInfo();
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please upload image file");
        return;
      }

      setAvatarFile(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="profile">
      <div className="profile__btns">
        <IconButton className="profile__btns__icon">
          <ArrowBackIosIcon
            className="profile__btns__back"
            color="primary"
            fontSize="large"
          />
        </IconButton>
        <IconButton onClick={handleLogout} className="profile__btns__icon">
          <LogoutIcon
            className="profile__btns__logout"
            color="primary"
            fontSize="large"
          />
        </IconButton>
      </div>
      <div className="profile__container">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Avatar
          src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar}
          className="profile__container__avatar"
          onClick={handleAvatarClick}
        />
        <form
          onSubmit={handleSubmit(saveUserInfo)}
          className="profile__container__form"
        >
          <MyTextField
            label="Username"
            name="username"
            control={control}
            initialValue={user.username}
            textWidth="100%"
            errorMsg={errors?.username?.message}
          />
          <MyTextField
            label="First Name"
            name="firstName"
            control={control}
            initialValue={user.first_name}
            textWidth="100%"
            errorMsg={errors?.firstName?.message}
          />
          <MyTextField
            label="Last Name"
            name="lastName"
            control={control}
            initialValue={user.last_name}
            textWidth="100%"
            errorMsg={errors?.lastName?.message}
          />
          <MyTextField
            label="Bio"
            name="bio"
            control={control}
            initialValue={user.bio}
            textWidth="100%"
            multiline
            rows={4}
            className="profile__container__form__bio"
            errorMsg={errors?.bio?.message}
          />
          <MyButton
            text="Save"
            type="submit"
            // className="profile__drawer__form__btn"
          />
        </form>
      </div>
    </div>
  );
}

export default Profile;
