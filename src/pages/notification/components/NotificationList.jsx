import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationDetails from "../children/NotificationDetails";


function NotificationList({ notificationValue, loadings }) {
  const navigate = useNavigate();


  return (
    <div className="notifications">
      <p className="black-text font-20px bold p-1">Notifications</p>
      <hr style={{color:"black"}}/>

      {notificationValue?.length === 0 && !loadings ? (
        <div
          className="valign-wrapper justify-center"
          style={{ height: "400px" }}
        >
          <img
            src="/images/noNotification.jpg"
            width={200}
            alt="no-notification"
          />
        </div>
      ) : (
        <>
          {notificationValue?.slice(0, 10)?.map((items) => (
            <NotificationDetails items={items} key={items._id} />
          ))}
          {notificationValue?.length > 10 && (
            <div
              className="valign-wrapper space-between p-1 viewAll"
              onClick={() => navigate("/notification")}
            >
              <b className="font-18px">View all notification</b>
              <span className="material-icons-outlined font-20px bold">
                open_in_new
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NotificationList;
