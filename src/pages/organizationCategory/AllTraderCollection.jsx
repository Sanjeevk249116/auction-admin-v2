import React, { useState } from "react";
import TraderListTable from "./tables/TraderListTable";
import SearchInput from "../auctionList/children/SearchInput";
import { useNavigate } from "react-router-dom";

function AllTraderCollection() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  return (
    <div className="">
      <div className="valign-wrapper space-between">
        <h4>Buyer List</h4>
        <div className="valign-wrapper gap-1">
        <buttom
            className="mt-1 font-16px white pointer"
            style={{
              border: "1px dashed black",
              borderRadius: "12px",
              padding: "4px 20px",
            }}
            onClick={() => navigate("/invite-trader")}
          >
            Invite New Trader
          </buttom>
        <SearchInput searchData={searchData} setSearchData={setSearchData} />
        </div>
      </div>

      <TraderListTable searchData={searchData}/>
    </div>
  );
}

export default AllTraderCollection;
