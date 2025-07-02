import React, { useEffect, useState } from "react";
import PickupDate from "../prototype/PickupDate";
import MultipleDateSelectedion from "../prototype/MultipleDateSelection";

function SelectDate({ turnSwitch, setPickupDateSelect, keyValue }) {
  const [pickupStartDate, setPickupStartDate] = useState("");
  const [specificDates, setSpecificDates] = useState([]);

  useEffect(() => {
    setPickupDateSelect((preValues) => ({
      ...preValues,
      deadLine: turnSwitch ? "" : pickupStartDate,
      type: turnSwitch ? "specificDates" : "deadline",
      specificDates: turnSwitch ? specificDates : [],
    }));
  }, [turnSwitch, specificDates, pickupStartDate]);

  useEffect(() => {
    setPickupStartDate("");
    setSpecificDates([]);
  }, [keyValue]);

  return (
    <div
      style={{
        marginRight: turnSwitch && "8px",
      }}
      key={keyValue}
    >
      {turnSwitch ? (
        <MultipleDateSelectedion
          id={"lastDate"}
          key={keyValue}
          label={"Select Your Pickup Dates"}
          setSpecificDates={setSpecificDates}
          specificDates={specificDates}
        />
      ) : (
        <PickupDate
          key={keyValue}
          id={"startDate"}
          label={"Pickup Date"}
          setPickupStartDate={setPickupStartDate}
          pickupStartDate={pickupStartDate}
          keyValue={keyValue}
        />
      )}
    </div>
  );
}

export default SelectDate;
