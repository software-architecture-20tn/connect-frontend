import React from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "../../Components/MyButton/MyButton";
import { removeToken } from "../../_helpers/authHelpers";

function Home({ handleIsLogin }) {
  const navigate = useNavigate();

  const LogOut = () => {
    removeToken();
    handleIsLogin(false);
    navigate("/login");
  };

  return (
    <div>
      <p>Home</p>
      <MyButton text="Log out" onClick={LogOut} />
    </div>
  );
}

export default Home;
