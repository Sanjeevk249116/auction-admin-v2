import React, { useEffect, useState } from "react";
import LiveSingleLotInfo from "../subChild/LiveSingleLotInfo";
import LiveUpdatingArea from "../subChild/LiveUpdatingArea";
import LiveLotsStatus from "./LiveLotsStatus";
import LiveBidingHistory from "../table/LiveBidingHistory";

function LiveLotsDetails({ liveOfferData, singleAuctionData, index }) {
  const [veiwBidDetails, setVeiwBidDetails] = useState(false);
  const [bidderDetails, setBidderDetails] = useState([]);

  useEffect(() => {
    const reversedBids = [...(liveOfferData?.bids || [])].reverse();
    setBidderDetails(reversedBids);
  }, [liveOfferData]);

  return (
    <>
      <div
        className="liveLots pin-top"
        style={{
          border: "1px solid black",
          borderRadius: "12px 0px 12px 12px",
        }}
      >
        <div>{index + 1}</div>
        <div
          style={{
            backgroundColor: "#fcf1ff",
            borderRadius: "12px 0px 12px 12px",
          }}
        >
          <LiveSingleLotInfo
            liveOfferData={liveOfferData?.fullOfferDetails}
            auctionId={singleAuctionData?.auctionId}
          />
          <hr className="black" style={{ height: "0.5px" }} />
          <LiveUpdatingArea
            liveOfferData={liveOfferData?.fullOfferDetails}
            veiwBidDetails={veiwBidDetails}
            setVeiwBidDetails={setVeiwBidDetails}
            setBidderDetails={setBidderDetails}
          />
        </div>
        <LiveLotsStatus
          singleAuctionData={singleAuctionData}
          item={liveOfferData?.fullOfferDetails}
        />
      </div>
      {veiwBidDetails && <LiveBidingHistory bidderDetails={bidderDetails} />}
    </>
  );
}

export default LiveLotsDetails;
