import React from "react";
import { TimePicker } from "react-ios-time-picker";

function PickupTime({ id, label, setPickupTime, keyValue }) {
  const handleShowData = (name) => {
    const value = document.querySelector(`#${name}`);
    value.click();
  };

  const handleSelectTime = (time) => {
    setPickupTime(time);
  };

  return (
    <span className={`flex column pin-top datePicker`}>
      <label className="font-16px black-text">
        {label} <span className="red-text">*</span>
      </label>
      <span className="input-tag-style  margin-0px timerStyle pointer">
        <TimePicker
          key={keyValue}
          id={id}
          role="input"
          type="time"
          onChange={(time) => handleSelectTime(time)}
          required
          cellHeight={70}
        />
        <span
          className="material-icons-outlined logo-Date-time"
          onClick={() => handleShowData(id)}
        >
          schedule
        </span>
      </span>
    </span>
  );
}

export default PickupTime;
