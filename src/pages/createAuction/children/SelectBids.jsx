import React from "react";
import InputFieldForLots from "../../createOffer/children/InputFieldForLots";
import { useMediaQuery } from "react-responsive";

function SelectBids({ setAuctionDetails, auctionDetails }) {
  const isTablet = useMediaQuery({ query: "(max-width: 700px)" });
  return (
    <div className="pin-top" style={{ marginRight: isTablet ?"0.7rem": "1.2rem" }}>
      <InputFieldForLots
        label={"Bids Validation"}
        type={"number"}
        name={"bidValidity"}
        placeholder={"Enter days"}
        value={auctionDetails?.bidValidity}
        setCreateOffer={setAuctionDetails}
      />
    </div>
  );
}

export default SelectBids;
