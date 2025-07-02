import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleAuction } from "../../redux/action/auction";
import SpinnersLoading from "../commanPage/loader/SpinnersLoading";
import PayEmdLotOfProduct from "./table/PayEmdLotOfProduct";

function ProductAuctionPayEmd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleAuctionData, singleAuctionLoading } = useSelector(
    (state) => state.singleAuction
  );

  useEffect(() => {
    dispatch(getSingleAuction(id));
  }, [dispatch, id]);


  if (singleAuctionLoading) {
    return <SpinnersLoading />;
  }

  return (
    <div className="mt-1 flex column gap-1">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <span className="valign-wrapper">
          <h4>Emd Details - </h4>
          <p className="cercle-purple-text" style={{ margin: "5px 0 0 5px" }}>
            {" "}
            {singleAuctionData.auctionId}
          </p>
        </span>
      </span>
   
        <PayEmdLotOfProduct
          offers={singleAuctionData?.offers}
          singleAuctionLoading={singleAuctionLoading}
        />
     
      {/* <AddEmdDetails payemdDetails={payemdDetails} setPayemdDetails={setPayemdDetails} /> */}
    </div>
  );
}

export default ProductAuctionPayEmd;
