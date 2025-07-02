import React, { useEffect, useState } from "react";
import PickupTime from "../prototype/PickupTime";
import { formate24hrsTo12hrs } from "../../../../helper/helpers";

function SelectTime({ turnSwitch, setPickupTimeSelect, keyValue }) {
  const [pickupStartTime, setPickupStartTime] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [pickupLastTime, setPickupLastTime] = useState("");

  useEffect(() => {
    setPickupLastTime("");
    setPickupStartTime("");
    setStartingTime("");
  }, [keyValue]);

  useEffect(() => {
    if (turnSwitch) {
      setStartingTime("");
    } else {
      setPickupLastTime("");
      setPickupStartTime("");
    }
  }, [turnSwitch]);

  useEffect(() => {
    setPickupTimeSelect((preValues) => ({
      ...preValues,
      startingTime: formate24hrsTo12hrs(startingTime),
      type: turnSwitch === false ? "specificTime" : "range",
      timeRange:
        turnSwitch === false
          ? { startTime: "", endTime: "" }
          : {
              startTime: formate24hrsTo12hrs(pickupStartTime),
              endTime: formate24hrsTo12hrs(pickupLastTime),
            },
    }));
  }, [turnSwitch, pickupStartTime, pickupLastTime, startingTime, keyValue]);

  return (
    <div
      key={keyValue}
      style={{
        marginRight: !turnSwitch && "8px",
        display: "grid",
        gridTemplateColumns: turnSwitch && "repeat(2,1fr)",
        gap: "30px",
      }}
    >
      {turnSwitch ? (
        <>
          <PickupTime
            key={keyValue}
            id={"startTime"}
            label={"Pickup Start Time"}
            setPickupTime={setPickupStartTime}
          />
          <PickupTime
            key={keyValue}
            id={"lastTime"}
            label={"Pickup Last Time"}
            setPickupTime={setPickupLastTime}
          />
        </>
      ) : (
        <PickupTime
          keyValue={keyValue}
          id={"startingTimes"}
          label={"Pickup Time"}
          setPickupTime={setStartingTime}
        />
      )}
    </div>
  );
}

export default SelectTime;
