import React from "react";


function Switch({ isOn, handleToggle ,textName}) {
  return (
    <div className="valign-wrapper">
      <h6 className={`black-text`}>{textName}</h6>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch`}
        type="checkbox"
      />
      <label
        style={{
          background: !isOn && "#A09C9C",
          backgroundImage: isOn && "linear-gradient(to right,#54138C,#A652EF)",
        }}
        className="switch-label ml-1"
        htmlFor={`switch`}
      >
        <span className={`switch-button`} />
      </label>
    </div>
  );
}

export default Switch;
