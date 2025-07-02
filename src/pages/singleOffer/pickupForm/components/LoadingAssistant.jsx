import React from "react";
import Switch from "../../../utils/Switch";

function LoadingAssistant({ pickupDetails, setPickupDetails }) {
  return (
    <div
      className="border-radius-12 border-1px"
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <div
        className={` valign-wrapper space-between top-border-radius pin-top`}
        style={{
          padding: "1rem 2rem",
        }}
      >
        <span>
          <h5 className="margin-0px">Loading Assistants</h5>
          <p className="font-13px">
            If you want loading assistance for load scraps, please switch on the
            button.
          </p>
        </span>

        <Switch
          isOn={pickupDetails.loadingAssistance}
          handleToggle={(e) =>
            setPickupDetails((prev) => ({
              ...prev,
              loadingAssistance: !prev.loadingAssistance,
            }))
          }
          textName={""}
        />
        <div
          className="select-label pointer"
          style={{ width: "63px", height: "25px", right: "31px" }}
          onClick={() =>
            setPickupDetails((prev) => ({
              ...prev,
              loadingAssistance: !prev.loadingAssistance,
            }))
          }
        ></div>
      </div>
    </div>
  );
}

export default LoadingAssistant;
