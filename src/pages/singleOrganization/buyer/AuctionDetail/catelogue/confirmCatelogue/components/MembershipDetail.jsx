import React from "react";

function MembershipDetail({ catelogueInformation }) {
  return (
    <p
      style={{
        whiteSpace: "pre-wrap",
        textAlign: "left",
      }}
    >
      {catelogueInformation?.membershipDetails}
    </p>
  );
}

export default MembershipDetail;
