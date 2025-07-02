import React from "react";
import TableLoader from "./TableLoader";

function CommanLoader() {
  return (
    <div className="valign-wrapper justify-center cover white">
      <TableLoader
        headerData={[
          "Auction ID",
          "Auction Region",
          "Description",
          "Auction Type",
          "Date/Timings",
          "Catalogue status",
          "Actions",
        ]}
      />
    </div>
  );
}

export default CommanLoader;
