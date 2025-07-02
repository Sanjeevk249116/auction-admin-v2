import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScrapDetails from "./children/ScrapDetails";
import AuctionSchedule from "../commanPage/AuctionInfo/AuctionSchedule";
import EmdPaidTables from "./table/EmdPaidTables";
import AuctionBidTable from "./table/AuctionBidTable";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAuction } from "../../redux/action/auction";
import { detailsOfSingleOffer } from "../../redux/action/offers";

function OfferBidsDetails() {
  const { id, offerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleAuctionData } = useSelector((state) => state.singleAuction);
  const { singleOfferData, offerDetailLoading } = useSelector(
    (state) => state.singleOfferDetails
  );

  // const handleDownloadPDF = () => {
  //   downloadPDF(contentRef.current, "bid_details.pdf");
  // };
  useEffect(() => {
    dispatch(getSingleAuction(id));
    dispatch(detailsOfSingleOffer(offerId));
  }, [dispatch, id, offerId]);

  return (
    <div className="mt-1">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Lot Bid History</h4>
      </span>

      <AuctionSchedule singleAuctionData={singleAuctionData} />
      <div className="full-width mt-2">
        <ScrapDetails
          singleOfferData={singleOfferData}
          offerDetailLoading={offerDetailLoading}
        />

        <h4 className="font-cercular-bold cercle-purple-text">
          EMD Paid Members
        </h4>
        
        <EmdPaidTables
          paidEmdDetails={singleOfferData?.depositedBy}
          offerDetailLoading={offerDetailLoading}
        />

        <div className="valign-wrapper space-between mt-2">
          <h4 className="font-cercular-bold cercle-purple-text">
            Completed Auction Bids
          </h4>

          {/* <button
            className="valign-wrapper pointer white cover cercle-purple-text"
            style={{ padding: "5px 15px" }}
            onClick={handleDownloadPDF}
            aria-label="View and Download PDF"
          >
            <span
              className="material-icons-outlined font-20px"
              style={{ marginRight: "5px" }}
            >
              file_download
            </span>{" "}
            Download
          </button> */}
        </div>
        {/* <AuctionBidTable pickupButton={true} /> */}
        <AuctionBidTable pickupButton={false} singleOfferData={singleOfferData} offerDetailLoading={offerDetailLoading} />
      </div>
      {/* <div ref={contentRef} className="pdf-content">
        <DownloadAuctionBid bid/>
      </div> */}
    </div>
  );
}

export default OfferBidsDetails;
