import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import AuctionSchedule from "../../../../commanPage/AuctionInfo/AuctionSchedule";
import { useState } from "react";
import { getSingleAuction } from "../../../../../redux/action/auction";
import { startingPriceForApproval } from "../../../../../redux/action/price";
import { ClipLoader } from "react-spinners";
import ProductLotPriceApprove from "./ProductLotPriceApprove";

function PriceApprovalForProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { priceLoading } = useSelector((state) => state.startingPriceApproval);
  const [offerPrice, setOfferprice] = useState([
    { startingPrice: "", offer: "" },
  ]);
  const { singleAuctionData, singleAuctionLoading } = useSelector(
    (state) => state.singleAuction
  );

  const sendStartingPriceForApproval = (amount, offer) => {
    let updatedOfferPrice = [...offerPrice];
    const index = updatedOfferPrice.findIndex((item) => item?.offer === offer);
    if (index !== -1) {
      updatedOfferPrice[index].startingPrice = amount;
    } else {
      updatedOfferPrice.push({ startingPrice: amount, offer: offer });
    }
    updatedOfferPrice = updatedOfferPrice.filter(
      (item) =>
        item.startingPrice !== null &&
        item.startingPrice !== undefined &&
        item.startingPrice !== ""
    );
    setOfferprice(updatedOfferPrice);
  };

  const handlePriceApproval = () => {
    dispatch(startingPriceForApproval(id, offerPrice, navigate, setOfferprice));
  };

  useEffect(() => {
    dispatch(getSingleAuction(id));
  }, [dispatch, id]);

  useEffect(() => {}, [singleAuctionData]);

  useEffect(() => {
    const filterOfferPrice = singleAuctionData?.offers?.filter(
      (offer) => offer?.startingPrice > 0
    );
    const filterOnlyPriceAndId = filterOfferPrice?.map((offer) => ({
      startingPrice: offer?.startingPrice,
      offer: offer?._id,
    }));
    setOfferprice(filterOnlyPriceAndId);
  }, [singleAuctionData?.offers]);

  return (
    <div className="flex column mt-1">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Price Approval</h4>
      </span>
      <AuctionSchedule singleAuctionData={singleAuctionData} />
      <div className="flex column gap-3 mt-3">
        {singleAuctionData?.offers?.map((offer) => (
          <ProductLotPriceApprove
            singleOfferData={offer}
            key={offer?._id}
            offerPrice={offerPrice}
            offerDetailLoading={singleAuctionLoading}
            sendStartingPriceForApproval={sendStartingPriceForApproval}
          />
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <button
          className={`button-style pointer font-20px select-wrapper ${
            singleAuctionData?.offers?.length === offerPrice?.length
              ? "cercle-purple white-text"
              : "grey lighten-2 grey-text"
          }`}
          style={{ padding: "10px 40px", marginBottom: "10px" }}
          disabled={
            singleAuctionData?.offers?.length === offerPrice?.length
              ? false
              : true
          }
          onClick={handlePriceApproval}
        >
          {priceLoading ? <ClipLoader color="red" size={20} /> : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default PriceApprovalForProduct;
