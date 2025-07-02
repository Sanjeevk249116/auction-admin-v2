import React from "react";
import { useMediaQuery } from "react-responsive";
import TimeSlot from "../children/TimeSlot";
import TimeSlotLoader from "../../../../commanPage/loader/TimeSlotLoader";

function TimeSlotOfOffer({ singleAuctionData, singleAuctionLoading }) {
  const isLaptop = useMediaQuery({ query: "(max-width: 1140px)" });

  return (
    <div
      className={`flex column gap-1`}
      style={{ width: isLaptop ? "100%" : "40%", }}
    >
      {singleAuctionLoading ? (
        <TimeSlotLoader />
      ) : (
        <TimeSlot
          singleAuctionData={singleAuctionData}
        />
      )}
    </div>
  );
}

export default TimeSlotOfOffer;
