import React, { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  auctionTypeStyle,
  convertTo12HourFormat,
  handleDateSetUp,
} from "../../../helper/helpers";
import { useMediaQuery } from "react-responsive";

function AuctionSchedule({
  singleAuctionData,
  loading = false,
  liveRoom = true,
}) {
  const isTablet = useMediaQuery({ query: "(max-width: 810px)" });
  const [isInspectionDataAvailable, setIsInspectionDataAvailable] =
    useState(true);

  const details = useMemo(() => {
    const baseDetails = [
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
    ];
    // Adding EMD Date & Time and Inspection details if liveRoom is true
    if (liveRoom) {
      baseDetails.push({
        label: "EMD Date & Time",
        value: `${handleDateSetUp(
          singleAuctionData?.EMDSchedule?.lastDate
        )} & ${convertTo12HourFormat(
          singleAuctionData?.EMDSchedule?.lastTime
        )}`,
      });

      //for checking if inspection schedule is present
      const inspection = singleAuctionData?.inspectionSchedule;
      const hasValidInspection =
        inspection &&
        (inspection?.startingTime ||
          inspection?.endingTime ||
          inspection?.endDate);
      setIsInspectionDataAvailable(hasValidInspection);
      if (hasValidInspection) {
        baseDetails.push(
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
          }
        );
      }

      baseDetails.push({
        label: "Location",
        value:
          singleAuctionData?.location?.address ||
          singleAuctionData?.inspectionSchedule?.inspectionLocation,
      });
    }

    return baseDetails;
  }, [singleAuctionData, liveRoom]);

  return (
    <div
      className={`cover white text-center auctionStyle mt-1`}
      style={{
        gridTemplateColumns:
          !isInspectionDataAvailable && !isTablet ? "repeat(3, 1fr)" : undefined,
      }}
    >
      {details?.map((detail, index) => (
        <span key={detail?.label}>
          <label className="cercle-purple-text font-18px">
            {loading ? <Skeleton width={100} /> : detail.label}
          </label>
          <p className={`mb-1 black-text `}>
            {loading ? <Skeleton width={200} /> : detail.value}
          </p>
        </span>
      ))}
    </div>
  );
}

export default AuctionSchedule;
