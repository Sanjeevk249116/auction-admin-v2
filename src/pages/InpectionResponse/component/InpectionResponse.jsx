import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import ResponseField from "../children/ResponseField";

function InspectionResponse() {
  const isMobile = useMediaQuery({ query: "(max-width: 730px)" });
  const [auctionDetailsData, setAuctionDetailsData] = useState({});
  const navigate = useNavigate();
  const loadings = false;

  return (
    <div className="mt-1">
      <span className="valign-wrapper gap-1" >
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4 className="">Inspection Response</h4>
      </span>
      <div
        className={`cover white z-depth-1 ${
          isMobile ? "p-1" : "p-2"
        } container flex column gap-1`}
      >
        <b className="font-20px font-weight-600" style={{ flex: "0.96" }}>
          Auction ID:{" "}
          <span className="cercle-purple-text">
            {loadings ? (
              <Skeleton width={300} />
            ) : (
              auctionDetailsData?.auction?.auctionId
            )}
          </span>
        </b>
        {/* <AuctionTimeAndLocation
          auctioDetailsData={auctionDetailsData?.auction}
          loading={loadings}
        /> */}
        <ResponseField
          auctionDate={auctionDetailsData?.auction?.auctionSchedule?.startDate}
        />
      </div>
    </div>
  );
}

export default InspectionResponse;
