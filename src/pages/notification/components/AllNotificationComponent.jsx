import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotificationAuction } from "../../../redux/action/notification";
import NotificationDetails from "../children/NotificationDetails";

function AllNotificationComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notificationArray } = useSelector((state) => state?.notifications);
  const [storeNotification, setStoreNotification] = useState([]);

  useEffect(() => {
    dispatch(getNotificationAuction());
  }, [dispatch]
);
  useEffect(() => {
    setStoreNotification(notificationArray?.notifications);
  }, [notificationArray]);



  return (
    <div className="mt-1">
      <span className="valign-wrapper" style={{ gap: "20px" }}>
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate("/")}
        >
          arrow_back
        </span>
        <h3 className="font-cercular-bold ">Notification</h3>
      </span>
      <div className="valign-wrapper justify-center mt-1">
     
        <div className="border-1px">
          {storeNotification?.map((item) => (
            <NotificationDetails items={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllNotificationComponent;
