import React from "react";

function SellerTermAndCondition({ catelogueInformation }) {
  return (
    <p
      style={{
        whiteSpace: "pre-wrap",
        textAlign: "left",
      }}
    >
      {catelogueInformation?.sellerTermsAndCondition}
    </p>
  );
}

export default SellerTermAndCondition;
