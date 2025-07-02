import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { updateStartingPriceOfSingleLot } from "../../../redux/action/liveRoom";
import SingleLotsInLive from "./SingleLotsInLive";

function UpdateStartingPriceModel({
  singleOfferData,
  offerDetailLoading = false,
  setIsOpenUpdateStartingPrice,
}) {
  const dispatch = useDispatch();
  const { startingPriceLoading } = useSelector((state) => state.liveAuction);
  const [updateStartingPrice, setUpdateStartingPrice] = useState(
    singleOfferData?.startingPrice || 0
  );

  const handleSubmitStartingPrice = () => {
    dispatch(
      updateStartingPriceOfSingleLot(
        singleOfferData?.auction,
        singleOfferData?._id,
        +updateStartingPrice,
        setIsOpenUpdateStartingPrice
      )
    );
  };

  useEffect(() => {
    setUpdateStartingPrice(singleOfferData?.startingPrice || 0);
  }, [singleOfferData]);

  return (
    <div className="flex column gap-1">
      <h5 className="font-20px margin-0px cercle-purple-text valign-wrapper justify-center">
        <span> Update Starting Price </span>
      </h5>
      <SingleLotsInLive
        singleOfferData={singleOfferData}
        offerDetailLoading={offerDetailLoading}
        tagLotNumber={true}
      />
      <span className="flex column gap-1">
        <span>
          <p>
            Update Starting Price <span className=" red-text">*</span>
          </p>
          <input
            type="number"
            name="updateStartingPrice"
            value={updateStartingPrice}
            placeholder="Enter update starting price amount"
            className="input-tag-style input-width"
            onChange={(e) => setUpdateStartingPrice(e.target.value)}
          />
        </span>
        <div className="valign-wrapper justify-center">
          <button
            className="button-style pointer font-16px white-text red"
            style={{ padding: "8px 10px", width: "150px" }}
            onClick={handleSubmitStartingPrice}
            disabled={updateStartingPrice <= 0 || startingPriceLoading}
          >
            {startingPriceLoading ? (
              <ClipLoader color="green" size={20} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </span>
    </div>
  );
}

export default UpdateStartingPriceModel;
