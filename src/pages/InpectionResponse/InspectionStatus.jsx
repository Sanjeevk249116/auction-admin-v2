import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import InspectionListTable from "./table/InspectionListTable";
import SearchInput from "../auctionList/children/SearchInput";

function InspectionStatus() {
  const isMobile = useMediaQuery({ query: "(max-width: 420px)" });
  const [searchList, setSearchList] = useState("");

  return (
    <div className="">
      <div
        className={`${isMobile ? "" : "valign-wrapper space-between"}`}
        style={{ marginBottom: "7px" }}
      >
        <h4>Inspection Response List</h4>
        <SearchInput searchData={searchList} setSearchData={setSearchList} />
      </div>
      <InspectionListTable searchList={searchList} />
    </div>
  );
}

export default InspectionStatus;
