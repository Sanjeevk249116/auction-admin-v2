import React from "react";
import InputFieldForLots from "../../createOffer/children/InputFieldForLots";
import { useMediaQuery } from "react-responsive";

function SelectContract({ setCreateOffer, auctionDetails }) {
    const isTablet = useMediaQuery({ query: "(max-width: 700px)" });
  return (
    <div className="pin-top" style={{ marginRight:isTablet?"0.7rem": "0.3rem" }}>
      <InputFieldForLots
        label={"Contract Validation"}
        type={"number"}
        name={"contractValidity"}
        value={auctionDetails?.contractValidity}
        placeholder={"Enter days"}
        setCreateOffer={setCreateOffer}
      />
    </div>
  );
}

export default SelectContract;
