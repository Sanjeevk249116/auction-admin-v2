import React from "react";
import { useMediaQuery } from "react-responsive";
import { TimePicker } from "react-ios-time-picker";

function TimePickerForLots({
  label,
  name,
  editValue,
  setCreateOffer,
  intervalValue,
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const onChangeTime = (timeValue, name) => {
    setCreateOffer((prevData) => ({ ...prevData, [name]: timeValue }));
  };

  const openWithIcons = (name) => {
    const value = document.querySelector(`#${name}`);
    value.click();
  };

  return (
    <span className={`flex column pin-top ${isMobile && "mr-1"}`}>
      <label className="font-16px black-text">
        {label} <span className="red-text">*</span>
      </label>
      <span
        className={`input-tag-style margin-0px ${isMobile && "timerStyle"}`}
        style={{ height: "46px" }}
      >
        {isMobile ? <input
          key={intervalValue}
          id={name}
          type="time"
          name={name}
          value={editValue?.name}
          onChange={(time) => { const timeValue = time.target.value; onChangeTime(timeValue, name) }}
          required
          cellHeight={70}
        /> : <>
          <TimePicker
            key={intervalValue}
            id={name}
            role="input"
            type="time"
            name={name}
            value={editValue?.name}
            onChange={(time) => onChangeTime(time, name)}
            required
            cellHeight={70}
          />
          <span
            className="material-icons-outlined logo-Date-time pointer"
            onClick={() => openWithIcons(name)}
          >
            schedule
          </span>
        </>}
      </span>
    </span>
  );
}

export default TimePickerForLots;
