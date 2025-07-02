import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import singleAuctionData from "../../jsonData/SingleAuctionData.json";
import AuctionSchedule from "../commanPage/AuctionInfo/AuctionSchedule";
import InspectionOfferTable from "./table/InspectionOfferTable";
import ResponseDetails from "./component/ResponseDetails";

function InspectionDetails() {
  const navigate = useNavigate();
  const isMoblie = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className="mt-1">
      <span
        className={`valign-wrapper ${isMoblie ? "mb-4" : ""}`}
        style={{ gap: "25px" }}
      >
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>

        <h4>Inspection Details</h4>
      </span>

      <div>
        <AuctionSchedule singleAuctionData={singleAuctionData} />
        <ResponseDetails />
        <InspectionOfferTable
          offers={singleAuctionData?.offers}
          status={singleAuctionData?.status}
          auctionType={singleAuctionData?.auctionType}
        />
      </div>
    </div>
  );
}

export default InspectionDetails;
