import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import OfferLoader from "../../../../commanPage/loader/OfferLoader";

function SingleLotPriceApprove({
  singleOfferData,
  offerDetailLoading,
  sendStartingPriceForApproval,
  offerPrice
}) {
  const isDesktop = useMediaQuery({ query: "(max-width: 1300px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [value, setValue] = useState("");

  useEffect(() => {
    const priceValue =
      offerPrice?.find((item) => item.offer === singleOfferData?._id)
        ?.startingPrice || "";
    if (priceValue !== value) {
      setValue(priceValue);
    }
  }, [singleOfferData, offerPrice, value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    sendStartingPriceForApproval(newValue, singleOfferData?._id);
  };

  return (
    <div>
      {offerDetailLoading ? (
        <OfferLoader label={true} />
      ) : (
        <div
          key={singleOfferData?._id}
          className={`cover white pin-top gap-1 text-center`}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(1,1fr)"
              : isDesktop
                ? "repeat(2,1fr)"
                : "1fr 1fr 1fr 350px",
            padding: isTablet ? "3rem 1rem 2rem 2rem" : "2rem 4rem 2rem 2rem",
            gap: isDesktop && "2rem",
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
          <div className="full-width">
            <input
              type="number"
              value={value}
              name="priceApproval"
              placeholder="Enter starting price"
              className="input-tag-style input-fields"
              onChange={handleInputChange}
            />
          </div>
          <p
            className="button-style white-text font-18px select-label"
            style={{
              padding: "4px 20px",
              top: "-17px",
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

export const MatchedItemDetail = ({ label, value }) => (
  <span>
    <p className="cercle-purple-text font-18px">{label}</p>
    <p className="black-text font-15px">{value}</p>
  </span>
);

export default SingleLotPriceApprove;
