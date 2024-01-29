import React, { useEffect, useState } from "react";
import { fetchApi } from "../../api";
import { Drawer } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.scss";
import Profile from "../../Components/Profile";
import ChatSidebar from "../../Components/ChatSidebar";
import FindUsers from "../../Components/FindUsers";
import CreateGroups from "../../Components/CreateGroups";
import CloseFriends from "../../Components/CloseFriends";
import ChatContent from "../../Components/ChatContent";
import { useDispatch } from "react-redux";
import { logOut } from "../../_helpers/authThunk";
import LoadingSpinner from "../../Components/LoadingSpinner";
import ShowFriends from "../../Components/ShowFriends";
import GroupMemberModal from "../../Components/GroupMemberModal";
function Home() {
  const getUserInfo = () => fetchApi.get("/users/me/", "");
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState("listChats");
  const [groupMemberModal, setGroupMemberModal] = useState(false);
  const [infoChatContent, setInfoChatContent] = useState({
    sender: null,
    receiver: null,
    group: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserInfo();
      if (response.status === 401) {
        dispatch(logOut());
      }
      const userData = await response.json();
      setUser(userData);
      setInfoChatContent((prev) => ({
        ...prev,
        sender: {
          id: userData.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          date_of_birth: userData.date_of_birth,
          avatar: userData.avatar,
          username: userData.username,
        },
      }));
    };

    fetchUserData();
  }, [refresh]);

  if (!user) {
    return <LoadingSpinner />;
  }

  let Sidebar;
  switch (sidebarOpen) {
    case "listChats":
      Sidebar = (
        <ChatSidebar
          setSidebarOpen={setSidebarOpen}
          infoChatContent={infoChatContent}
          setInfoChatContent={setInfoChatContent}
        />
      );
      break;
    case "profile":
      Sidebar = (
        <Profile
          user={user}
          setSidebarOpen={setSidebarOpen}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      );
      break;
    case "listFriends":
      Sidebar = (
        <ShowFriends
          setSidebarOpen={setSidebarOpen}
          infoChatContent={infoChatContent}
          setInfoChatContent={setInfoChatContent}
        />
      );
      break;
    case "findUsers":
      Sidebar = <FindUsers setSidebarOpen={setSidebarOpen} />;
      break;
    case "closeFriends":
      Sidebar = <CloseFriends setSidebarOpen={setSidebarOpen} />;
      break;
    case "createGroups":
      Sidebar = <CreateGroups setSidebarOpen={setSidebarOpen} />;
      break;
  }

  return (
    <div className="home">
      <ToastContainer />
      {user && (
        <Drawer anchor="left" variant="permanent" className="home__drawer">
          {Sidebar}
        </Drawer>
      )}
      <ChatContent
        user={user}
        infoChatContent={infoChatContent}
        setModalOpen={setGroupMemberModal}
      />
      {groupMemberModal && (
        <GroupMemberModal
          groupModalOpen={groupMemberModal}
          setGroupModalOpen={setGroupMemberModal}
          infoChatContent={infoChatContent}
        />
      )}
    </div>
  );
}

export default Home;
