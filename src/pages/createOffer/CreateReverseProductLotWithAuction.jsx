import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuctionSchedule from "../commanPage/AuctionInfo/AuctionSchedule";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAuction } from "../../redux/action/auction";
import ReverseLotProductForm from "./offerComponents/ReverseLotProductForm";
import ProductOfferListTable from "../commanPage/table/ProductOfferListTable";

function CreateReverseProductLotWithAuction() {
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
       <h4>Create Reverse product Lots</h4>
        </span>
      </div>
      <div className={`flex column gap-1 `}>
        <AuctionSchedule singleAuctionData={singleAuctionData} />

        {singleAuctionData?.offers?.length > 0 && (
          <ProductOfferListTable
             offers={singleAuctionData?.offers}
             loading={singleAuctionLoading}
          />
        )}

        <div className="full-width">
          <ReverseLotProductForm singleAuctionData={singleAuctionData} />
        </div>
      </div>
    </div>
  );
}

export default CreateReverseProductLotWithAuction;
