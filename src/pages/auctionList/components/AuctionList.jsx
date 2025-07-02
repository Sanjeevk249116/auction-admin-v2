import React from "react";
import { dashboardAuctionTable } from "../../../helper/auctionTable";
import { createElement } from "react";

function AuctionList({ homePageButton, searchData, auctionFilter }) {
  return (
    <>
      {dashboardAuctionTable[homePageButton] &&
        createElement(dashboardAuctionTable[homePageButton], {
          searchTraderList: searchData,
          auctionFilter: auctionFilter,
        })}
    </>
  );
}

export default AuctionList;
