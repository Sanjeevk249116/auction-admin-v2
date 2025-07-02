import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleLotMinimumBid } from "../../../redux/action/liveRoom";
import { ClipLoader } from "react-spinners";
import { notifyError } from "../../../helper/helpers";
import SingleServiceLotDetails from "./SingleServiceLotDetails";


function UpdateMinimumServiceBid({
  singleOfferData,
  offerDetailLoading = false,
  setIsOpenUpdateBid,
  checkFirstBid
}) {
  const dispatch = useDispatch();
  const [maximumBid, setMaximumBid] = useState(0);
  const { minimumBidUpdateLoading } = useSelector((state) => state.liveAuction);

  useEffect(() => {
    setMaximumBid(singleOfferData?.minimumBidDecrease);
  }, [singleOfferData]);

  const handleSubmitMaximumBid = () => {
    if (checkFirstBid) {
      return notifyError("You can't update minimum bid after bidding started.");
    }

    dispatch(
      updateSingleLotMinimumBid(
        singleOfferData?.auction,
        singleOfferData?._id,
        maximumBid
      )
    ).then(() => {
      setIsOpenUpdateBid(false);
    });
  };

  return (
    <div className="mt-1">
      <SingleServiceLotDetails
        singleOfferData={singleOfferData}
        offerDetailLoading={offerDetailLoading}
        tagLotNumber={true}
      />

      <span className="flex column gap-1 mt-2">
        <span>
          <p>
            Update Maximum Bid <span className=" red-text">*</span>
          </p>
          <input
            type="number"
            name="maximumBid"
            value={maximumBid}
            placeholder="Enter update maximum bid amount"
            className="input-tag-style input-width"
            onChange={(e) => setMaximumBid(e.target.value)}
          />
        </span>
        <div className="valign-wrapper justify-center">
          <button
            className="button-style pointer font-16px white-text red"
            style={{ padding: "8px 10px", width: "150px" }}
            onClick={handleSubmitMaximumBid}
            disabled={maximumBid <= 0 || minimumBidUpdateLoading}
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

export default UpdateMinimumServiceBid;
