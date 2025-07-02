import React from "react";

const MatchedItemDetail = ({ label, value }) => {
  return (
    <span>
      <p className="cercle-purple-text font-18px">{label}</p>
      <p className="black-text font-15px">{value}</p>
    </span>
  );
};

export default MatchedItemDetail;