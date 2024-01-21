import React from "react";
import Avatar from "../Avatar";
import "./FriendRequestItem.scss";
import { parseISO, formatDistanceToNow } from "date-fns";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchApi } from "../../api";

function FriendRequestItem({ requestItem }) {
  // const [isLoading, setIsLoading] = useState(false);
  const date = parseISO(requestItem.date_time_sent);
  const distance = formatDistanceToNow(date, { addSuffix: true });

  const handleAccept = async () => {
    const postAcceptRequest = fetchApi.post(
      `/users/friend-requests/${requestItem.id}/accept`,
    );
    try {
      const response = await postAcceptRequest();
      const responseJson = await response.json();
      console.log(responseJson);
      // setIsLoading(true);
    } catch (e) {
      console.log(e);
    } finally {
      // setIsLoading(false);
    }
  };
  return (
    <div className="friend-request-container">
      <Avatar
        className={"friend-request-container__avatar"}
        src={process.env.REACT_APP_MEDIA_URL + requestItem.sender_avatar}
      />
      <div className="friend-request-container__text">
        {requestItem.sender_first_name} {requestItem.sender_last_name} sent a
        friend request {distance}
      </div>
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="friend-request-container__accept"
        onClick={() => handleAccept()}
      />
    </div>
  );
}

export default FriendRequestItem;
