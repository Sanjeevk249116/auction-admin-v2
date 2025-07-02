import React from "react";
import DatePicker from "react-datepicker";
import { formatDate } from "../../../../helper/helpers";

function PickupDate({ label, id, setPickupStartDate, pickupStartDate, key }) {
  const handleShowLogo = (name) => {
    const value = document.querySelector(`#${name}`);
    value.click();
  };

  return (
    <span className={`flex column pin-top `}>
      <label className="font-16px black-text">
        {label} <span className="red-text">*</span>
      </label>
      <DatePicker
        id={id}
        key={key}
        role="input"
        type="date"
        value={pickupStartDate}
        onChange={(date) => {
          setPickupStartDate(formatDate(date));
        }}
        minDate={new Date()}
        className="datePicker input-tag-style margin-0px"
        required
      />
      <span
        className="material-icons-outlined logo-Date-time pointer"
        onClick={() => handleShowLogo(id)}
      >
        calendar_month
      </span>
    </span>
  );
}

export default PickupDate;
