import React from "react";
import { TimePicker } from "react-ios-time-picker";
import { useMediaQuery } from "react-responsive";

function TimePickers({ labels, name, modelObject, id, setAuctionDetails }) {
  const isTablet = useMediaQuery({ query: "(max-width: 600px)" });
  const handleShowData = (name) => {
    const value = document.querySelector(`#${name}`);
    value.click();
  };

  const onChangeTime = (timeValue, name, modelObject) => {
    setAuctionDetails((prev) => ({
      ...prev,
      [modelObject]: {
        ...prev[modelObject],
        [name]: timeValue,
      },
    }));
  };

 

  return (
    <span className={`flex column pin-top`}>
      <label className="font-16px black-text">
        {labels} <span className="red-text">*</span>
      </label>
      <span className="input-tag-style  margin-0px timerStyle pointer">
        {isTablet ?
          <input
            id={id}
            type="time"
            name={name}
            onChange={(time) => {const timeValue= time.target.value; 
            onChangeTime(timeValue, name, modelObject)}}
            required
            cellHeight={70}
          /> : <>
            <TimePicker
              id={id}
              role="input"
              type="time"
              name={name}
              onChange={(time) => onChangeTime(time, name, modelObject)}
              required
              cellHeight={70}
            />
            <span
              className="material-icons-outlined logo-Date-time"
              onClick={() => handleShowData(id)}
            >
              schedule
            </span>
          </>}
      </span>
    </span>
  );
}

export default TimePickers;
