import React from "react";

function StyleCatelogue({ children }) {
  return (
    <div
      className="full-width"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2 ,1fr)",
        rowGap: "0.5rem",
        columnGap: "30px",
      }}
    >
      {children}
    </div>
  );
}

export default StyleCatelogue;
