import React, { useRef } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { getFormattedDate } from "../../../../helper/helpers";


function MultipleDateSelectedion({
  label,
  id,
  setSpecificDates,
  specificDates,
  key,
}) {
  const datePickerRef = useRef();

  const handleShowLogo = () => {
    datePickerRef.current.openCalendar();
  };

  const handleDateChange = (dates) => {
    const formattedDates = dates?.map((date) => date.format("MM-DD-YYYY"));
    // if (formattedDates.length < 6) {
    //   setPickup(formattedDates);
    //   return;
    // }
    setSpecificDates(formattedDates);
  };

  return (
    <span className={`flex column pin-top `}>
      <label className="font-16px black-text">
        {label} <span className="red-text">*</span>
      </label>
      <DatePicker
        id={id}
        key={key}
        ref={datePickerRef}
        multiple
        value={specificDates}
        onChange={handleDateChange}
        plugins={[<DatePanel />]}
        minDate={getFormattedDate(new Date(), 0)}
        format="MM-DD-YYYY"
        sort
        inputClass="margin-0px datePicker input-tag-style"
        required
      />

      {specificDates?.length < 6 && (
        <span
          className="material-icons-outlined logo-Date-time pointer"
          onClick={() => handleShowLogo()}
        >
          calendar_month
        </span>
      )}
    </span>
  );
}

export default MultipleDateSelectedion;
