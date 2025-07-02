import React, { useEffect } from "react";
import { Dropdown } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getNotificationAuction } from "../../redux/action/notification";
import NotificationList from "./components/NotificationList";

function NotificationHomeComponent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const clickOnNotificationIcon = location.pathname === "/notification";
  const { notificationArray, loadings } = useSelector(
    (state) => state?.notifications
  );

  useEffect(() => {
    dispatch(getNotificationAuction());
  }, [dispatch]);


  const notificationTrigger = (
    <div className="notification-icon ml-1 mr-1">
      <div
        className="grey lighten-4 waves-circle flex align-center justify-center p-1 pin-top"
        style={{ marginTop: "5px" }}
      >
        <span className="material-icons-outlined pointer">notifications</span>
        {notificationArray?.newNotifications > 0 && (
          <img
            className="select-label pointer"
            style={{ top: "0%", right: "0%" }}
            src={`${process.env.PUBLIC_URL}/icons/Ellipse.svg`}
            alt="new-notification"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex align-center justify-center gap-1">
      {clickOnNotificationIcon ? (
        notificationTrigger
      ) : (
        <Dropdown
          options={{
            alignment: "right",
            coverTrigger: false,
          }}
          trigger={notificationTrigger || "defaultTrigger"}
          className="header-notification"
        >
          <NotificationList
            notificationValue={notificationArray?.notifications || []}
            loadings={loadings}
          />
        </Dropdown>
      )}
    </div>
  );
}

export default NotificationHomeComponent;
