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
  console.log(friendRequestList);
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
          {friendRequestList.length > 0 ? (
            friendRequestList.map((item) => {
              return <FriendRequestItem key={item.id} requestItem={item} />;
            })
          ) : (
            <div className="friend-requests__items__text">
              No friend requests await
            </div>
          )}
        </div>
      </Popper>
    </div>
  );
}

export default FriendRequestsNoti;
