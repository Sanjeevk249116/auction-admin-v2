import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLotDetailsFromAuction } from "../../../redux/action/offers";
import { ClipLoader } from "react-spinners";
import DeleteConfimationDetails from "./DeleteConfimationDetails";
import SingleLotsInLive from "../../liveRoom/subChild/SingleLotsInLive";
import DeleteProductConfirmation from "./DeleteProductConfirmation";

function DeleteLotConfimation({
    singleOfferData,
    offerDetailLoading = false,
    setIsDeletelotModelOpen,
    auctionType
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { deleteLoading } = useSelector(
        (state) => state.singleOfferDetails
    );

    const handleDeleteLot = () => {
        dispatch(
            deleteLotDetailsFromAuction(
                singleOfferData?.auction,
                singleOfferData?._id,
                setIsDeletelotModelOpen,
                navigate
            )
        );
    };


    return (
        <div className="flex column gap-1">
            <h4>Are you sure you want to delete this lot?</h4>
            {auctionType === "reverseAuctionService" ? <DeleteConfimationDetails
                singleOfferData={singleOfferData}
                offerDetailLoading={offerDetailLoading}
            /> : auctionType === "reverseAuctionProduct" ? <DeleteProductConfirmation
                singleOfferData={singleOfferData}
                offerDetailLoading={offerDetailLoading}
            /> : <SingleLotsInLive
                singleOfferData={singleOfferData}
                offerDetailLoading={offerDetailLoading}
            />}
            <div className="flex justify-center gap-1">
                <button
                    className={`button-style pointer font-16px white-text red`}
                    style={{ padding: "10px 25px" }}
                    onClick={handleDeleteLot}
                >
                    {deleteLoading ? <ClipLoader color="red" size={20} /> : "Delete Lot"}
                </button>
                <button
                    className={`button-style pointer font-16px white-text grey`}
                    style={{ padding: "10px 25px" }}
                    onClick={() => setIsDeletelotModelOpen(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DeleteLotConfimation;
