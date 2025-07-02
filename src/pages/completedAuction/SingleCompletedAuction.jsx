import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAuction } from "../../redux/action/auction";
import AuctionOfferandTime from "../singleOrganization/buyer/AuctionDetail/components/AuctionOfferandTime";
import TimeSlotOfOffer from "../singleOrganization/buyer/AuctionDetail/components/TimeSlotOfOffer";
import CatelogueTable from "../singleOrganization/buyer/AuctionDetail/tables/CatelogueTable";
import AuctionReportApproval from "./component/AuctionReportApproval";
import { notifyError } from "../../helper/helpers";
import BiddingPermission from "../singleOrganization/buyer/AuctionDetail/tables/BiddingPermission";
import SearchInput from "../auctionList/children/SearchInput";
import { generateAuctionReportForSingleAuction } from "../../redux/action/auctionReport";

function SingleCompletedAuction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isDastop = useMediaQuery({ query: "(max-width: 1550px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1140px)" });
  const [searchData, setSearchData] = useState("");
  const { singleAuctionData, singleAuctionLoading } = useSelector(
    (state) => state.singleAuction
  );
  const { generateReportLoading } = useSelector((state) => state.auctionReport);

  useEffect(() => {
    dispatch(getSingleAuction(id));
  }, [dispatch, id]);

  return (
    <div className={`flex column ${isDastop ? "gap-1" : "gap-2"} mt-1`}>
      <div className="valign-wrapper space-between flex-wrap">
        <span className="valign-wrapper gap-1">
          <span
            className="material-icons-outlined pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
          <h4>Auction Details</h4>
        </span>
        <span className="valign-wrapper gap-1">
          <button
            className={`button-style pointer cercle-purple white-text font-16px font-cercular-bold`}
            style={{
              padding: "5px 18px",
            }}
            onClick={() => dispatch(generateAuctionReportForSingleAuction(id))}
          >
            {generateReportLoading
              ? "Generating loading ..."
              : "Generate Auction Report"}
          </button>
          {singleAuctionData?.auctionReport && (
            <button
              className={`button-style pointer cercle-purple white-text font-16px font-cercular-bold`}
              style={{
                padding: "5px 18px",
              }}
              onClick={() => {
                navigate(`/auction-report/${id}`);
              }}
            >
              View Auction Report
            </button>
          )}
        </span>
      </div>
      <div
        className={`flex gap-1 ${isLaptop && "column"}`}
        style={{ marginTop: !isDastop && "-1rem" }}
      >
        <AuctionOfferandTime
          singleAuctionData={singleAuctionData}
          singleAuctionLoading={singleAuctionLoading}
        />
        <TimeSlotOfOffer
          singleAuctionData={singleAuctionData}
          singleAuctionLoading={singleAuctionLoading}
        />
      </div>

      <div>
        <div className="valign-wrapper space-between">
          <h4 className="margin-0px">Completed Lots List</h4>

          <button
            className={`button-style pointer cercle-purple-text font-weight-600 font-18px font-cercular-bold`}
            style={{
              padding: "5px 18px",
              border: "1px solid #6f2da8",
            }}
            onClick={() => {
              if (singleAuctionData?.reschedule?.status) {
                notifyError("Auction already rescheduled.");
              } else if (
                singleAuctionData?.auctionReport?.rejectedOffers?.length > 0
              ) {
                navigate(
                  `/reschedule-auction/${singleAuctionData?.industry}/${singleAuctionData?._id}`
                );
              } else {
                notifyError("No rejected offers to reschedule auction");
              }
            }}
          >
            Reschedule Auction
          </button>
        </div>
        <AuctionReportApproval
          singleAuctionData={singleAuctionData}
          loading={singleAuctionLoading}
        />
      </div>
      <div className={`white cover p-2`}>
        <h4 className=" cercle-black-text mb-1">
          Auction Catalogue & Corrigendum
        </h4>

        <CatelogueTable singleAuctionData={singleAuctionData} />
      </div>
      <div className="">
        <div className="valign-wrapper space-between">
          <span style={{ marginBottom: "-35px" }}>
            <h4>Bids Permission</h4>
          </span>
          <SearchInput searchData={searchData} setSearchData={setSearchData} />
        </div>
        <BiddingPermission searchData={searchData} />
      </div>
    </div>
  );
}

export default SingleCompletedAuction;
