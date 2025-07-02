import React from "react";
import PickupFormDetails from "./PickupFormDetails";
import singleAuctionData from "../../../jsonData/SingleAuctionData.json";
import singleOfferData from "../../../jsonData/singleOfferData.json";

function PickupInformation({ setIsModalOpen, singleBidDetails }) {
  return (
    <div className="pin-top" style={{ padding: "0.5rem 1rem" }}>
      <div
        className="valign-wrapper"
        style={{ gap: "7px", marginBottom: "2px" }}
      >
        <h3 className="margin-0px cercle-purple-text">
          You Accept and Raise Pickup for{" "}
          {singleBidDetails?.trader?.organizationName}
        </h3>
        <img src="/images/accept-icon.png" alt="accept=icon" width={27} />
      </div>
      <p className="mb-1 font-14px">
        Please provide the pickup details. Fill in the provided fields or
        customize by switching to the custom button if needed.
      </p>
      <PickupFormDetails
        sellerId={singleAuctionData?.seller}
        offerDetails={singleOfferData}
        setIsModalOpen={setIsModalOpen}
        singleBidDetails={singleBidDetails}
      />
    </div>
  );
}

export default PickupInformation;
