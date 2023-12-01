import React, { useEffect, useState } from "react";
import MyTextField from "../../Components/MyTextField/MyTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MyButton from "../../Components/MyButton/MyButton";
import { fetchApi } from "../../api/auth";
import { Drawer } from "@mui/material";
import "./Home.scss";

function Home({ handleIsLogin }) {
  const getUserInfo = () => fetchApi.get("/users/me/", "");
  const [user, setUser] = useState(null);
  // const [drawerOpen, setDrawerOpen] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserInfo();
      console.log(response);
      const userData = await response.json();
      console.log(userData);
      setUser(userData);
    };

    fetchUserData();
  }, []);
  const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    bio: yup.string(),
    username: yup.string().matches(/^[a-zA-Z0-9]*$/, "Invalid username"),
  });

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  if (!user) {
    return <p>Loading...</p>;
  }
  const saveUserInfo = () => {
    // Save user info logic here
  };

  return (
    <div className="profile">
      {user && (
        <Drawer anchor="left" variant="permanent" className="profile__drawer">
          <form
            onSubmit={handleSubmit(saveUserInfo)}
            className="profile__drawer__form"
          >
            <MyTextField
              label="Username"
              name="username"
              control={control}
              initialValue={user.username}
              textWidth="70%"
            />
            <MyTextField
              label="First Name"
              name="firstName"
              control={control}
              initialValue={user.firstName}
              textWidth="70%"
            />
            <MyTextField
              label="Last Name"
              name="lastName"
              control={control}
              initialValue={user.lastName}
              textWidth="70%"
            />
            <MyTextField
              label="Bio"
              name="bio"
              control={control}
              initialValue={user.bio}
              textWidth="70%"
              multiline
              rows={4}
              className="profile__drawer__form__bio"
            />
            <MyButton text="Save" type="submit" />
          </form>
        </Drawer>
      )}
    </div>
  );
}

export default Home;
