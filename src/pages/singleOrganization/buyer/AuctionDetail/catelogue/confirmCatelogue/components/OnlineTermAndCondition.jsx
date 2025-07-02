import React from "react";

function OnlineTermAndCondition({ catelogueInformation }) {
  return (
    <p
      style={{
        whiteSpace: "pre-wrap",
        textAlign: "left",
      }}
    >
      {catelogueInformation?.onlineAuctionCondition}
    </p>
  );
}

export default OnlineTermAndCondition;
