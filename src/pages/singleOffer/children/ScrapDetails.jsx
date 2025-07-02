import React from "react";
import { useMediaQuery } from "react-responsive";
import MatchedItemDetail from "../components/MatchedItemDetail ";
import OfferLoader from "../../commanPage/loader/OfferLoader";

function ScrapDetails({ singleOfferData, offerDetailLoading }) {
  const isDestop = useMediaQuery({ query: "(max-width: 1300px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMoblie = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div>
      {offerDetailLoading ? (
        <OfferLoader label={true} />
      ) : (
        <div
          key={singleOfferData?._id}
          className={`cover white mb-2 pin-top gap-1 text-center
              `}
          style={{
            display: "grid",
            gridTemplateColumns: isMoblie
              ? "repeat(1,1fr)"
              : isDestop
              ? "repeat(3,1fr)"
              : "repeat(6,1fr)",
            padding: isTablet ? "3rem 1rem 2rem 2rem" : "2rem",
          }}
        >
          <MatchedItemDetail
            label="Scrap Type"
            value={singleOfferData?.scrapDetails?.type}
          />
          <MatchedItemDetail
            label="Quantity / UOM"
            value={`${singleOfferData?.scrapDetails?.quantity}/${singleOfferData?.scrapDetails?.unit}`}
          />
          <MatchedItemDetail
            label="EMD Amount (Rs.)"
            value={singleOfferData?.EMDAmount}
          />
          <MatchedItemDetail
            label="Starting price (Rs.)"
            value={
              singleOfferData?.startingPrice > 0
                ? singleOfferData?.startingPrice
                : "N/A"
            }
          />

          <MatchedItemDetail
            label="Min Increment (Rs.)"
            value={singleOfferData?.minimumBid}
          />

          <MatchedItemDetail
            label="Lifting Periods "
            value={singleOfferData?.liftingPeriod}
          />

          <p
            className="button-style white-text font-18px select-label"
            style={{
              padding: "8px 20px",
              top: "-20px",
              left: "2%",
              backgroundImage: "linear-gradient(#6F2DA8, #3B0966)",
            }}
          >
            {`Lot No : ${singleOfferData?.offerNumber}`}
          </p>
        </div>
      )}
    </div>
  );
}

export default ScrapDetails;
