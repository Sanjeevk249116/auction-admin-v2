import React, { createElement } from "react";
import { sellerAuctionTable } from "../../../../helper/auctionTable";

function SellerAuctionStatus({
  sellerHomePageButton,
  searchData,
  auctionFilter,
}) {
  return (
    <>
      {sellerAuctionTable[sellerHomePageButton] &&
        createElement(sellerAuctionTable[sellerHomePageButton], {
          searchData: searchData,
          auctionFilter: auctionFilter,
        })}
    </>
  );
}

export default SellerAuctionStatus;
