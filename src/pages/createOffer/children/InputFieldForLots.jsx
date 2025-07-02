import React from "react";
import { useMediaQuery } from "react-responsive";

function InputFieldForLots({
  label,
  name,
  type,
  placeholder,
  value,
  setCreateOffer,
  requireds = true,
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreateOffer((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <span className="flex column">
      <label className="font-16px black-text">
        {label} {requireds && <span className="red-text">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`input-tag-style ${isMobile && "input-width"}`}
        required={requireds}
      />
    </span>
  );
}

export default InputFieldForLots;
