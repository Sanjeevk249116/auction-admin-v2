import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleAuction } from "../../../../../redux/action/auction";
import NewTraderLotPermission from "../tables/NewTraderLotPermission";
import { givePermissionForLiveRoom } from "../../../../../redux/action/bidPermission";
import { ClipLoader } from "react-spinners";

function AddNewTrader() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [traderEmail, setTraderEmail] = useState("");
  const [selectedOffers, setSelectedOffers] = useState([]);
  const { singleAuctionData, singleAuctionLoading } = useSelector(
    (state) => state.singleAuction
  );
  const { permissionBidderLoading } = useSelector(
    (state) => state.bidderPermission
  );

  const validateFieldsforDisabled = () => {
    if (traderEmail === "" || selectedOffers.length <= 0) {
      return true;
    }
    return false;
  };

  const submitBidderPermission = () => {
    dispatch(
      givePermissionForLiveRoom(id, traderEmail, selectedOffers, navigate)
    );
    setTraderEmail("");
    setSelectedOffers([]);
  };

  useEffect(() => {
    dispatch(getSingleAuction(id));
  }, [dispatch, id]);

  return (
    <div className="mt-1 flex column gap-1">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Add New Trader</h4>
      </span>
      {/* <h4>Select Lots</h4> */}
     
        <NewTraderLotPermission
          singleAuctionData={singleAuctionData}
          singleAuctionLoading={singleAuctionLoading}
          selectedOffers={selectedOffers}
          setSelectedOffers={setSelectedOffers}
        />
   
      <span>
        <p>
          Email <span className=" red-text">*</span>
        </p>
        <input
          type="email"
          name="emailId"
          placeholder="Enter email"
          value={traderEmail}
          onChange={(e) => setTraderEmail(e.target.value)}
          className="input-tag-style input-width"
        />
      </span>
      <div className="valign-wrapper justify-center gap-2 mt-1">
        <button
          className={`button-style pointer font-20px select-wrapper ${
            !validateFieldsforDisabled()
              ? "cercle-purple white-text"
              : "grey lighten-2 grey-text"
          }`}
          style={{ padding: "8px 30px" }}
          disabled={validateFieldsforDisabled()}
          onClick={submitBidderPermission}
        >
          {permissionBidderLoading ? (
            <ClipLoader color="red" size={20} />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}

export default AddNewTrader;
