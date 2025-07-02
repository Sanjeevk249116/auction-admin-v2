import React from "react";
import { notifySuccess } from "../../../helper/helpers";

function PickupRerenderButton({ item, handleActionClick }) {
  const renderButton = (text, action, color, disabled = false) => (
    <button
      href="#actionModal"
      className={`button-style white-text ${
        disabled ? "grey lighten-2" : color
      } pointer modal-trigger`}
      style={{ padding: "5px 10px", width: "80px" }}
      onClick={() => handleActionClick(item?._id, action)}
      disabled={disabled}
    >
      {text}
    </button>
  );

  const isPending = item?.status === "pending";
  const isAccepted = item?.status === "accepted";
  const isCompleted = item?.status === "completed";
  const isCancelled = item?.status === "cancelled";
  const isRejected = item?.status === "reject";

  return (
    <span className="flex gap-1 justify-center">
      {renderButton(
        "Reject",
        "reject",
        "red lighten-1",
        isAccepted || isCompleted || isCancelled || isRejected
      )}
      {isPending && renderButton("Accept", "accept", "purple")}
      {isAccepted && renderButton("Complete", "complete", "green lighten-1")}
      {isCompleted &&
        renderButton("Complete", "completed", "grey lighten-2", true)}
      {(isCancelled || isRejected) &&
        renderButton("Accept", "accept", "purple", true)}
      <span
        className="material-icons-outlined pointer"
        onClick={() => notifySuccess("PickUp delete successfully ")}
      >
        delete
      </span>
    </span>
  );
}

export default PickupRerenderButton;
