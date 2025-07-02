import React, { useEffect, useState } from "react";
import SingleLotsInLive from "./SingleLotsInLive";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleLotMinimumBid } from "../../../redux/action/liveRoom";
import { ClipLoader } from "react-spinners";
import { notifyError } from "../../../helper/helpers";


function UpdateMinimumBidModel({
  singleOfferData,
  offerDetailLoading = false,
  setIsOpenUpdateBid,
  checkFirstBid
}) {
  const dispatch = useDispatch();
  const [minimumBid, setMinimumBid] = useState(0);
  const { minimumBidUpdateLoading } = useSelector((state) => state.liveAuction);

  useEffect(() => {
    setMinimumBid(singleOfferData?.minimumBid);
  }, [singleOfferData]);

  const handleSubmitMinimumBid = () => {
    if (checkFirstBid) {
      return notifyError("You can't update minimum bid after bidding started.");
    }

    dispatch(
      updateSingleLotMinimumBid(
        singleOfferData?.auction,
        singleOfferData?._id,
        minimumBid
      )
    ).then(() => {
      setIsOpenUpdateBid(false);
    });
  };

  return (
    <div className="mt-1">
      <SingleLotsInLive
        singleOfferData={singleOfferData}
        offerDetailLoading={offerDetailLoading}
        tagLotNumber={true}
      />

      <span className="flex column gap-1 mt-2">
        <span>
          <p>
            Update Minimum Bid <span className=" red-text">*</span>
          </p>
          <input
            type="number"
            name="minimumBid"
            value={minimumBid}
            placeholder="Enter update minimum bid amount"
            className="input-tag-style input-width"
            onChange={(e) => setMinimumBid(e.target.value)}
          />
        </span>
        <div className="valign-wrapper justify-center">
          <button
            className="button-style pointer font-16px white-text red"
            style={{ padding: "8px 10px", width: "150px" }}
            onClick={handleSubmitMinimumBid}
            disabled={minimumBid <= 0 || minimumBidUpdateLoading}
          >
            {minimumBidUpdateLoading ? (
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

export default UpdateMinimumBidModel;
