import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuctionSchedule from "../commanPage/AuctionInfo/AuctionSchedule";
import OfferListTable from "../commanPage/table/OfferListTable";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAuction } from "../../redux/action/auction";
import CreateForwardLot from "./offerComponents/CreateForwardLot";

function CreateLotWithForwardAuction() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleAuctionData, singleAuctionLoading } = useSelector(
    (state) => state.singleAuction
  );

  useEffect(() => {
    dispatch(getSingleAuction(id));
  }, [dispatch, id]);

  if (singleAuctionLoading) {
  }

  return (
    <div className="mt-1">
      <div className="valign-wrapper space-between">
        <span className={`valign-wrapper gap-1`}>
          <span
            className="material-icons-outlined pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
          <h4>Create forward Lots</h4>
        </span>
      </div>
      <div className={`flex column gap-1 `}>
        <AuctionSchedule singleAuctionData={singleAuctionData} />

        {singleAuctionData?.offers?.length > 0 && (
          <OfferListTable
            auctionType={singleAuctionData?.auctionType}
            offers={singleAuctionData?.offers}
          />
        )}

        <div className="full-width">
          <CreateForwardLot singleAuctionData={singleAuctionData} />
        </div>
      </div>
    </div>
  );
}

export default CreateLotWithForwardAuction;
