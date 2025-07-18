import React from "react";
import { useMediaQuery } from "react-responsive";
import MatchedItemDetail from "../../singleOffer/components/MatchedItemDetail ";
import OfferLoader from "../../commanPage/loader/OfferLoader";

function SingleProductLotDetail({ singleOfferData, offerDetailLoading, tagLotNumber = false }) {
  const isTablet = useMediaQuery({ query: "(max-width: 950px)" });
  const isMoblie = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div>
      {offerDetailLoading ? (
        <OfferLoader label={true} />
      ) : (
        <div
          key={singleOfferData?._id}
          className={`cover white pin-top gap-1 text-center
              `}
          style={{
            display: "grid",
            gridTemplateColumns: isMoblie ? "repeat(1,1fr)" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)",
            padding: isTablet ? "3rem 1rem 2rem 2rem" : "2rem",
          }}
        >
          <MatchedItemDetail
            label="Scrap Type"
            value={singleOfferData?.productDetails?.type}
          />
          <MatchedItemDetail
            label="Quantity / UOM"
            value={`${singleOfferData?.productDetails?.quantity}/${singleOfferData?.productDetails?.unit}`}
          />
          {/* <MatchedItemDetail
            label="EMD Amount (Rs.)"
            value={singleOfferData?.EMDAmount}
          /> */}
          <MatchedItemDetail
            label="Starting price"
            value={singleOfferData?.startingPrice > 0 ? singleOfferData?.startingPrice : "N/A"}
          />
  
            <MatchedItemDetail
              label="Max Increment"
              value={singleOfferData?.minimumBidDecrease}
            />


          {tagLotNumber && <p
            className="button-style white-text font-18px select-label"
            style={{
              padding: "8px 20px",
              top: "-20px",
              left: "2%",
              backgroundImage: "linear-gradient(#6F2DA8, #3B0966)",
            }}
          >
            {`Lot No : ${singleOfferData?.offerNumber}`}
          </p>}
        </div>
      )}
    </div>
  );
}

export default SingleProductLotDetail;
