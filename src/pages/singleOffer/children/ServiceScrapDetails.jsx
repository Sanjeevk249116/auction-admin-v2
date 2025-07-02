import React from "react";
import { useMediaQuery } from "react-responsive";
import MatchedItemDetail from "../components/MatchedItemDetail ";
import OfferLoader from "../../commanPage/loader/OfferLoader";

function ServiceScrapDetails({ singleOfferData, offerDetailLoading }) {
  const isDestop = useMediaQuery({ query: "(max-width: 1300px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMoblie = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className="flex column gap-2 mb-2">
      {offerDetailLoading ? (
        <OfferLoader label={true} />
      ) : (
        <div
          key={singleOfferData?._id}
          className={`cover white pin-top gap-1 text-center
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
            label="Service Title"
            value={singleOfferData?.serviceDetails?.title}
          />
          <MatchedItemDetail
            label="Category"
            value={singleOfferData?.serviceDetails?.category}
          />
          <MatchedItemDetail
            label="Event Fee (Rs.)"
            value={singleOfferData?.eventFee}
          />
          <MatchedItemDetail
            label="EMD Amount"
            value={singleOfferData?.EMDAmount}
          />
          <MatchedItemDetail
            label="Starting price "
            value={
              singleOfferData?.startingPrice > 0
                ? singleOfferData?.startingPrice
                : "N/A"
            }
          />

          <MatchedItemDetail
            label="Max Decrement"
            value={singleOfferData?.minimumBidDecrease}
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
      <div className="flex space-between flex-wrap cover p-1">
        <span className="flex column gap-10px">
          <h5 className="cercle-purple-text">Service Requirements</h5>
          <span className="valign-wrapper flex-wrap gap-2">
            {singleOfferData?.serviceDetails?.requirements?.map((item, index) => (
              <p key={item} className="valign-wrapper gap-10px">
                <span className="material-icons-outlined cercle-purple-text pointer">
                  check_box
                </span>
                {item}
              </p>
            ))}
          </span>
        </span>
        <span>
          <p>No of Quantity : {singleOfferData?.serviceDetails?.quantity}</p>
          <p>Sub-Category : {singleOfferData?.serviceDetails?.subCategory}</p>
        </span>
      </div>
    </div>
  );
}

export default ServiceScrapDetails;
