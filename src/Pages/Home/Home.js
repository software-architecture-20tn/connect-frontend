import React, { useEffect, useState } from "react";
import { fetchApi } from "../../api";
import { Drawer } from "@mui/material";
import "./Home.scss";
// import Profile from "./Profile";
import ChatSidebar from "../../Components/ChatSidebar";
import ChatContent from "../../Components/ChatContent";
import { useDispatch } from "react-redux";
import { logOut } from "../../_helpers/authThunk";
function Home() {
  const getUserInfo = () => fetchApi.get("/users/me/", "");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  // const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserInfo();
      if (response.status === 401) {
        dispatch(logOut());
      }
      const userData = await response.json();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home">
      {user && (
        <Drawer anchor="left" variant="permanent" className="home__drawer">
          {/* <Profile user={user} /> */}
          <ChatSidebar />
        </Drawer>
      )}
      <ChatContent />
    </div>
  );
}

export default Home;
