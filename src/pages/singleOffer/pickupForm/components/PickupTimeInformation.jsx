import React, { useState } from "react";
import SelectTime from "../children/SelectTime";
import Switch from "../../../utils/Switch";

function PickupTimeInformation({ isTimeOpen, id, setPickupTimeSelect,keyValue }) {
  const [mouseOnSwitch, setMouseOnSwitch] = useState(false);
  const [turnSwitch, setTurnSwitch] = useState(false);

  return (
    <li
      id={id}
      className="border-radius-12 border-1px"
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <div
        className={`${
          !mouseOnSwitch && "collapsible-header"
        } valign-wrapper space-between top-border-radius`}
        style={{ padding: "1rem 2rem", borderRadius: !isTimeOpen && "12px" }}
      >
        <span>
          <h5 className="margin-0px">Time duration</h5>
          <p className="font-13px">
            Select the Timings for your availability to pickup.
          </p>
        </span>
        {isTimeOpen && (
          <div
            style={{ marginLeft: "20%" }}
            onMouseEnter={() => setMouseOnSwitch(true)}
            onMouseLeave={() => setMouseOnSwitch(false)}
          >
            <Switch
              isOn={turnSwitch}
              handleToggle={() => setTurnSwitch((pre) => !pre)}
              textName={"Custom"}
            />
          </div>
        )}
        <span className="material-icons-outlined flex column gap-1">
          {isTimeOpen ? "expand_less" : "expand_more"}
        </span>
      </div>
      <div className="collapsible-body " style={{ border: "none" }}>
        <SelectTime turnSwitch={turnSwitch} setPickupTimeSelect={setPickupTimeSelect} keyValue={keyValue}/>
      </div>
    </li>
  );
}

export default PickupTimeInformation;
