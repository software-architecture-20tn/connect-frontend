import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import MyButton from "../../Components/MyButton/MyButton";
// import { removeToken } from "../../_helpers/authHelpers";
// import { logOut } from "../../_helpers/authThunk";
// import { useDispatch } from "react-redux";
import { fetchApi } from "../../api/auth";

function Home({ handleIsLogin }) {
  // const navigate = useNavigate();

  // const LogOut = () => {
  //   handleIsLogin(false);
  //   dispatch(logOut());
  //   navigate("/login");
  // };
  // const [user, setUser] = useState({
  //   avatar: 'avatar.png',
  //   realName: 'John Doe',
  //   username: 'johndoe',
  //   phoneNumber: '123-456-7890',
  //   bio: 'This is John Doe',
  //   settings: {
  //     notificationsAndSounds: true,
  //     privacyAndSecurity: true,
  //     dataAndStorage: true,
  //     chatSettings: true,
  //     device: 'Device Name'
  //   },
  //   chats: ['Chat 1', 'Chat 2', 'Chat 3']
  // });

  const getUserInfo = () => fetchApi.get("/users/me/", "");
  const [user, setUser] = useState(null);

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
  if (!user) {
    return <p>Loading...</p>;
  }
  const saveUserInfo = () => {
    // Save user info logic here
  };
  return (
    // <div>
    //   <p>Home</p>
    //   <MyButton text="Log out" onClick={LogOut} />
    // </div>
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 200px", padding: "10px" }}>
        <img src={user.avatar} alt="User Avatar" />
        <h2>{user.first_name + user.last_name}</h2>
        <p>@{user.username}</p>
        <h3>Account</h3>
        <p>Bio: {user.bio}</p>
        <button onClick={saveUserInfo}>Save</button>
      </div>
      <div style={{ flex: "1", padding: "10px" }}>
        <h2>Chats</h2>
        {/* {user.chats.map((chat, index) => (
          <p key={index}>{chat}</p>
        ))} */}
      </div>
    </div>
  );
}

export default Home;
