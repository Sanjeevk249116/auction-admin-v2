import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TimePicker } from "react-ios-time-picker";

function EditLotsTime({
  label,
  name,
  editValue,
  setCreateOffer,
  intervalValue,
  timeValue
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [time, setTime] = useState(timeValue);

  const onChangeTime = (timeValue, name) => {
    setCreateOffer((prevData) => ({ ...prevData, [name]: timeValue }));
  };

  const openWithIcons = (name) => {
    const value = document.querySelector(`#${name}`);
    value.click();
  };

    useEffect(() => {
      if (typeof timeValue === "string" && /^\d{2}:\d{2}$/.test(timeValue)) {
        setTime(timeValue);
      }
    }, [timeValue]);
  
    if (!/^\d{2}:\d{2}$/.test(time)) return null;

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
          value={time}
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
            value={time}
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

export default EditLotsTime;
