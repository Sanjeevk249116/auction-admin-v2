import React from "react";

function TabButton({ label, isActive, onClick,icon }) {
  return (
    <button
      className={`z-depth-2 box_card pointer border-12px valign-wrapper justify-center ${
        isActive ? "activeTab" : ""
      }`}
      onClick={onClick}
    >
      <span
        className="material-icons circle mr-1 purple lighten-5 cercle-purple-text"
        style={{ padding: "8px" }}
      >
        {icon}
      </span>
      <h4 className="font-25">{label}</h4>
    </button>
  );
}

export default TabButton;
