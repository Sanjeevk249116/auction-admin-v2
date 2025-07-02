import React from "react";
import { useMediaQuery } from "react-responsive";

function EmdInputAndText({
  label,
  edit = false,
  value,
  setCatelogueInformation,
}) {
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
  
    setCatelogueInformation((prevState) => ({
      ...prevState,
      auctionInformation: prevState.auctionInformation.map((item) =>
        item.label === name ? { ...item, value } : item
      ),
    }));
  };
  
  return (
    <>
      {edit ? (
        <input
          type="text"
          value={value}
          name={label}
          className={`input-tag-style input-width ${isTablet ? "font14px" : "font-16px"}`}
          required
          onChange={handleChangeInput}
        />
      ) : (
        <p className="bottomStyle">{label}</p>
      )}
    </>
  );
}

export default EmdInputAndText;
