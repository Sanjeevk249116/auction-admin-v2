import React, { useEffect, useState } from "react";
import LiveLotsStatus from "./LiveLotsStatus";
import ServiceLiveSingleLotInfo from "./ServiceLiveSingleLotInfo";
import ServiceLiveUpdatingArea from "../subChild/ServiceLiveUpdatingArea";
import ServiceLiveBidingHistory from "../table/ServiceLiveBidingHistory";

function ServiceLiveLotsDetails({ liveOfferData, singleAuctionData, index }) {
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
          <ServiceLiveSingleLotInfo
            liveOfferData={liveOfferData?.fullOfferDetails}
            auctionId={singleAuctionData?.auctionId}
          />
          <hr className="black" style={{ height: "0.5px" }} />
          <ServiceLiveUpdatingArea
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
      {veiwBidDetails && <ServiceLiveBidingHistory bidderDetails={bidderDetails} />}
    </>
  );
}

export default ServiceLiveLotsDetails;
