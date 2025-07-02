import React, { useState } from "react";
import SearchInput from "../auctionList/children/SearchInput";
import SellerListTable from "./tables/SellerListTable";
import { useNavigate } from "react-router-dom";

function AllSellerCollection() {
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState("");

  return (
    <div className="">
      <div className="valign-wrapper space-between">
        <h4>Seller List</h4>
        <div className="valign-wrapper gap-1">
          <buttom
            className="mt-1 font-16px white pointer"
            style={{
              border: "1px dashed black",
              borderRadius: "12px",
              padding: "4px 20px",
            }}
            onClick={() => navigate("/invite-seller")}
          >
            Invite New Seller
          </buttom>
          <SearchInput searchData={searchData} setSearchData={setSearchData} />
        </div>
      </div>

      <SellerListTable searchData={searchData} />
    </div>
  );
}

export default AllSellerCollection;
