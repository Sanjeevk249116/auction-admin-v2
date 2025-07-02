import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

function NotificationItem({ text, checked, onChange }) {
  
  const isMobile = useMediaQuery({ query: "(max-width:500px)" });
  return (
    <li className="collection-item valign-wrapper space-between ">
      <span>{text}</span>
      <div className="switch black-text">
        <label>
          Off
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className="lever"></span>
          On
        </label>
      </div>
    </li>
  );
}

function NotificationPage() {
  const notifications = [
    "Email Notifications",
    "WhatsApp Notifications",
    "Upcoming Auction Notifications",
    "Marketing Update",
    "Auction Reminders",
  ];

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (notification) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [notification]: !prevState[notification],
    }));
  };

  return (
    <div className="cover white mt-1 p-1">
      <b className="flex justify-center mb-1 font-18px">Notifications</b>
      <ul className="collection container " style={{marginBottom:"25px"}}>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification}
            text={notification}
            checked={checkedItems[notification]}
            onChange={() => handleCheckboxChange(notification)}
          />
        ))}
      </ul>
    </div>
  );
}

export default NotificationPage;
