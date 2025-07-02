import React from "react";

function TermsAndCondition({ reverseCatalogueInformation, fieldName }) {
  return (
    <p
      style={{
        whiteSpace: "pre-wrap",
        textAlign: "left",
      }}
    >
      {reverseCatalogueInformation?.[fieldName]}
    </p>
  );
}

export default TermsAndCondition;
