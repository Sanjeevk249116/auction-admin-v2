import React from "react";
import WithdrawalDetail from "./WithdrawalDetail";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { accepttWithdrawalRequest } from "../../../redux/action/wallet";

function AcceptWithdrawalModel({ WithdrawalDetails, setOpenAcceptModal }) {
  const dispatch = useDispatch();
  const { requestLoading } = useSelector((state) => state.withdrawalRequest);
  return (
    <div className="flex column gap-10px">
      <span
        className="white-text green lighten-1 flex justify-center border-12px"
        style={{ fontSize: "18px", padding: "5px 10px" }}
      >
        Are you sure you want to accept this withdrawal request?
      </span>
      <WithdrawalDetail WithdrawalDetails={WithdrawalDetails} />
      <div className="flex justify-end gap-1">
        <button
          className="green btn-small"
          onClick={() =>
            dispatch(accepttWithdrawalRequest(WithdrawalDetails?._id))
          }
        >
          {requestLoading ? <ClipLoader color="white" size={20} /> : "Confirm"}
        </button>

        <button
          className="red btn-small"
          onClick={() => setOpenAcceptModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AcceptWithdrawalModel;
