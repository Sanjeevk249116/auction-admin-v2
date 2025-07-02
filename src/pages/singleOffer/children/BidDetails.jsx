import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import {
  auctionTypeStyle,
  convertTo12HourFormat,
  handleDateSetUp,
} from "../../../helper/helpers";

function BidDetails({ singleOfferData, singleAuctionData, loadings = false }) {
  const details = useMemo(
    () => [
      {
        label: "Auction ID ",
        value: `${singleAuctionData?.auctionId} `,
      },
      {
        label: "Auction Date",
        value: `${handleDateSetUp(
          singleAuctionData?.auctionSchedule?.startDate
        )}`,
      },
      {
        label: "Auction Type",
        value: `${auctionTypeStyle(singleAuctionData?.auctionType)}`,
      },
      {
        label: "Auction Time",
        value: `${convertTo12HourFormat(
          singleAuctionData?.auctionSchedule?.startingTime
        )} to ${convertTo12HourFormat(
          singleAuctionData?.auctionSchedule?.endingTime
        )}`,
      },
      {
        label: "EMD Date & Time",
        value: `${handleDateSetUp(
          singleAuctionData?.EMDSchedule?.lastDate
        )} & ${convertTo12HourFormat(
          singleAuctionData?.EMDSchedule?.lastTime
        )}`,
      },

      {
        label: "Inspection Date ",
        value: `${handleDateSetUp(
          singleAuctionData?.inspectionSchedule?.endDate
        )} `,
      },

      {
        label: "Inspection Time",
        value: `${convertTo12HourFormat(
          singleAuctionData?.inspectionSchedule?.startingTime
        )} to ${convertTo12HourFormat(
          singleAuctionData?.inspectionSchedule?.endingTime
        )}`,
      },

      {
        label: "Location",
        value: singleAuctionData?.inspectionSchedule?.inspectionLocation,
      },
      {
        label: "Scrap Name",
        value: singleOfferData?.scrapDetails?.name,
      },
      {
        label: "Scrap Type",
        value: singleOfferData?.scrapDetails?.type,
      },
      {
        label: "Quantity / UOM",
        value: `${singleOfferData?.scrapDetails?.quantity} /
          ${singleOfferData?.scrapDetails?.unit}`,
      },
      {
        label: "EMD Amount (Rs.)",
        value: singleOfferData?.EMDAmount,
      },
    ],
    [singleAuctionData, singleOfferData]
  );


  return (
    <div className={`cover white text-center auctionStyle`}>
      {details?.map((detail, index) => (
        <span key={detail?.label}>
          <label className="cercle-purple-text font-18px">
            {loadings ? <Skeleton width={100} /> : detail.label}
          </label>
          <p className={`mb-1 black-text `}>
            {loadings ? <Skeleton width={200} /> : detail.value}
          </p>
        </span>
      ))}
    </div>
  );
}

export default BidDetails;
