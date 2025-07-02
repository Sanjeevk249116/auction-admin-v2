import React from "react";

function RerederInfoDetail({ label, value }) {
  return (
    <span className="flex column" style={{ gap: "5px" }}>
      <h6>{label}</h6>
      <p className="font-16px" style={{ color: "#333" }}>
        {value}
      </p>
    </span>
  );
}

export default RerederInfoDetail;
