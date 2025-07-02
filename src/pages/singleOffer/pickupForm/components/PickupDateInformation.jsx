import React, { useState } from "react";
import SelectDate from "../children/SelectDate";
import Switch from "../../../utils/Switch";
import Location from "../../../commanPage/location/Location";

function PickupDateInformation({
  isPickupOpen,
  values,
  setValues,
  id,
  setPickupDateSelect,
  keyValue,
}) {
  const [mouseOnSwitch, setMouseOnSwitch] = useState(false);
  const [turnSwitchToggle, setTurnSwitchToggle] = useState(false);

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
        style={{ padding: "1rem 2rem", borderRadius: !isPickupOpen && "12px" }}
      >
        <span>
          <h5 className="margin-0px">Pickup Details</h5>
          <p className="font-13px">
            Select the dates for your availability to pickup.
          </p>
        </span>
        {isPickupOpen && (
          <div
            style={{ marginLeft: "20%" }}
            onMouseEnter={() => setMouseOnSwitch(true)}
            onMouseLeave={() => setMouseOnSwitch(false)}
          >
            <Switch
              isOn={turnSwitchToggle}
              handleToggle={() => setTurnSwitchToggle((pre) => !pre)}
              textName={"Custom"}
            />
          </div>
        )}

        <span className="material-icons-outlined flex column gap-1">
          {isPickupOpen ? "expand_less" : "expand_more"}
        </span>
      </div>
      <div className="collapsible-body " style={{ border: "none" }}>
        <SelectDate
          turnSwitch={turnSwitchToggle}
          setPickupDateSelect={setPickupDateSelect}
          keyValue={keyValue}
        />
        <div className="mt-1 datePicker">
          <Location values={values} setValues={setValues} />
        </div>
      </div>
    </li>
  );
}

export default PickupDateInformation;
