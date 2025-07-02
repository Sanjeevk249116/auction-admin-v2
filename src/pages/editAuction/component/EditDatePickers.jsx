import React from "react";
import { DatePicker } from "react-materialize";
import { notifyError } from "../../../helper/helpers";
import { useMediaQuery } from "react-responsive";

function EditDatePickers({
  label,
  name,
  modelObject,
  value,
  id,
  setAuctionDetails,
  lastDate,
  gapDay,
}) {
  const isTablet = useMediaQuery({ query: "(max-width: 600px)" });

  const handleDateChange = (date, name, modelObject) => {
    if (!lastDate) {
      notifyError("Kindly provide the Auction Date first.");
      return;
    }
    const selectedDate = new Date(date);
    const lastDateObj = new Date(lastDate);

    if (selectedDate > lastDateObj) {
      notifyError("Selected date cannot be after the Auction Date.");
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setAuctionDetails((prevData) => ({
      ...prevData,
      [modelObject]: {
        ...prevData[modelObject],
        [name]: formattedDate,
      },
    }));
  };

  const handleShowLogo = (name) => {
    const value = document.querySelector(`#${name}`);
    value.click();
  };

  const getMinDate = () => {
    const today = new Date();
    return new Date(today?.setDate(today.getDate() + gapDay));
  };

  const getMaxDate = () => {
    const today = new Date(lastDate);
    return lastDate ? new Date(today?.setDate(today.getDate() - 1)) : null;
  };


  return (
    <span className={`flex column pin-top `}>
      <label className="font-16px black-text">
        {label} <span className="red-text">*</span>
      </label>
      <DatePicker
        id={id}
        role="input"
        type={!isTablet && `date`}
        name={name}
        value={value}
        onChange={(date) => {
          handleDateChange(date, name, modelObject);
          document.body.style.overflow = "auto";
        }}
        options={{
          minDate: getMinDate(),
          maxDate: getMaxDate(),
          onOpenStart: () => {
            document.body.style.overflow = "auto";
          },
          onClose: () => {
            document.body.style.overflow = "auto";
          },
        }}
        className="input-width input-tag-style margin-0px"
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

export default EditDatePickers;
