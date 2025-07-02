import React, { useState } from "react";

function OnlineTermAndCondition({
  catelogueInformation,
  setCatelogueInformation,
  editValue,
}) {
  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setCatelogueInformation((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div>
      {editValue ? (
        <textarea
          className="terms-textarea"
          rows="30"
          name="onlineAuctionCondition"
          value={catelogueInformation?.onlineAuctionCondition}
          onChange={handleTextChange}
          style={{
            width: "100%",
            padding: "1rem",
            height: "10%",
            border: "1px solid #e0e0e0",
          }}
        />
      ) : (
        <p
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {catelogueInformation?.onlineAuctionCondition}
        </p>
      )}
    </div>
  );
}

export default OnlineTermAndCondition;
