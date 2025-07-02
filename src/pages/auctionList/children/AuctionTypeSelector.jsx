import React from "react";
import { Select } from "react-materialize";

function AuctionTypeSelector({ auctionType, setAuctionType }) {
  return (
    <span className="input-field-style" style={{ height: "40px" }}>
      <Select
        className="custom-width-dropdown"
        value={auctionType}
        onChange={(e) => setAuctionType(e.target.value)}
      >
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </Select>
    </span>
  );
}

export default AuctionTypeSelector;
