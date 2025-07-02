import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { convertDateIntoDayMonthOrRelativeTime } from "../../../helper/helpers";
import { updateReadNotification } from "../../../redux/action/notification";


function NotificationDetails({ items }) {
  const location = useLocation();
  const [hover, setHover] = useState(false);
  const viewAllDetail = location.pathname === "/notification";
  const { title, body, status, _id, auction, type,auctionType } = items;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleReadNotification = (id) => {
    dispatch(updateReadNotification(id, type, navigate, auction,auctionType));
  };

  const logoType = () => {
    if (type === "inspection-request") {
      return "notifications";
    } else if (type === "new-auction") {
      return "notifications";
    } else if (type === "pickup") {
      return "local_shipping";
    } else {
      return "notifications";
    }
  };

  return (
    <div className="notofication-style">
      <div
        className="valign-wrapper font-15px pin-top pointer "
        style={{
          padding: "8px 15px",
          backgroundColor: status === "unread" && "#e3e9f7",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={(e) => handleReadNotification(_id)}
      >
        <span
          className="material-icons-outlined circle mr-1 cercle-purple-text font-20px"
          style={{ padding: "4px", border: "1px solid #ecd7fe" }}
        >
          {logoType()}
        </span>
        <p
          className={`${!hover && "NoOfline"} newNotification font-15px`}
          style={{ width: !viewAllDetail && "220px", WebkitLineClamp: 1 }}
        >
          {title}
        </p>
        <span style={{ margin: "0px 5px" }}>{"  -  "}</span>
        <p
          className={`${!hover && "NoOfline"}`}
          style={{ width: !viewAllDetail && "490px", WebkitLineClamp: 1 }}
        >
          {body}
        </p>
        <p
          className="ml-1 flex justify-end"
          style={{ fontSize: "13px", flex: 1, minWidth: "80px" }}
        >
          {convertDateIntoDayMonthOrRelativeTime(items?.createdAt)}
        </p>
        {status === "unread" && (
          <span
            className="circle cercle-purple select-label"
            style={{ width: "8px", height: "8px", left: "35px", top: "8px" }}
          ></span>
        )}
      </div>
      <hr />
    </div>
  );
}
export default NotificationDetails;
