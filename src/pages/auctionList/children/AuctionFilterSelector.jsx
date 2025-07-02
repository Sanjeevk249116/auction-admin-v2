import React from "react";
import { Select } from "react-materialize";
import { useMediaQuery } from "react-responsive";

function AuctionFilterSelector({ setAuctionFilter }) {
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  return (
    <span
      className="input-field-style"
      style={{ height: "40px", width: isMobile ? "95%" : "260px", marginTop: isMobile && "0px" }}
    >
      <img src="/images/urlIcon.png" alt="auctionLogo" width={25} />
      <Select
        className="custom-width-dropdown"
        multiple={false}
        options={{
          classes: "browser-default",
          dropdownOptions: {
            alignment: "left",
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            coverTrigger: false,
          },
        }}
        onChange={(e) => setAuctionFilter(e.target.value)}
      >
        <option value="">All Auction</option>
        <option value="forwardAuction">Forward Auction</option>
        <option value="reverseAuctionService">Reverse Service Auction</option>
        <option value="reverseAuctionProduct">Reverse Product Auction</option>
      </Select>
    </span>
  );
}

export default AuctionFilterSelector;
