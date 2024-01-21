import React, { useEffect, useRef } from "react";
import FriendRequestItem from "./FriendRequestItem";
import { Popper } from "@mui/material";
import "./FriendRequestsNoti.scss";

function FriendRequestsNoti({ friendRequestList, open, anchor, ...props }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current =
      document.getElementsByClassName("sidebar-wrapper")[0];
  }, []);
  return (
    <div className="friend-requests">
      <Popper
        open={open}
        anchorEl={anchor}
        className="friend-requests__popper"
        container={containerRef.current}
        placement="bottom"
        modifiers={[
          {
            name: "flip",
            options: {
              fallbackPlacements: [],
            },
          },
          {
            name: "offset",
            options: {
              offset: [-95, 10],
            },
          },
        ]}
      >
        <div className="friend-requests__items">
          {friendRequestList.map((item) => {
            return <FriendRequestItem key={item.id} requestItem={item} />;
          })}
        </div>
      </Popper>
    </div>
  );
}

export default FriendRequestsNoti;
