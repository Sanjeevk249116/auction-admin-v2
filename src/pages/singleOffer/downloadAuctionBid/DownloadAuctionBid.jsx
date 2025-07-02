import React, { useRef } from "react";
import EmdPaidTables from "../table/EmdPaidTables";
import AuctionBidTable from "../table/AuctionBidTable";
import BidDetails from "../children/BidDetails";
import singleOfferData from "../../../jsonData/singleOfferData.json";
import singleAuctionData from "../../../jsonData/SingleAuctionData.json";

function DownloadAuctionBid() {
  const contentRef = useRef(null);

  return (
    <div className="flex column gap-1 mt-1" style={{display:"none"}}>
      <h3 className="font-cercular-bold cercle-purple-text margin-0px">
        Completed Auction Bids
      </h3>

      <div ref={contentRef} className="flex column gap-1">
        <BidDetails
          singleOfferData={singleOfferData}
          singleAuctionData={singleAuctionData}
        />
        <span>
          <h4 className="font-cercular-bold cercle-purple-text">
            EMD Paid Members
          </h4>
          <EmdPaidTables paidEmdDetails={singleOfferData?.depositedBy} />
        </span>
        <span>
          <h3 className="font-cercular-bold cercle-purple-text">
            Completed Auction Bids
          </h3>
          <AuctionBidTable />
        </span>
      </div>
    </div>
  );
}

export default DownloadAuctionBid;
