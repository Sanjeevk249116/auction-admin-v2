import React, { useState } from "react";
import WithdrawalDetail from "./WithdrawalDetail";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { rejectWithdrawalRequest } from "../../../redux/action/wallet";

function RejectWithdrawalModel({ WithdrawalDetails, setOpenRejectModal }) {
    const dispatch = useDispatch();
    const { requestLoading } = useSelector((state) => state.withdrawalRequest);
    const [rejectReason, setRejectReason] = useState("");
    return (
        <div className="flex column gap-10px">
            <span
                className="white-text red lighten-1 flex justify-center border-12px"
                style={{ fontSize: "18px", padding: "5px 10px" }}
            >
                Are you sure you want to reject this withdrawal request?
            </span>
            <WithdrawalDetail WithdrawalDetails={WithdrawalDetails} />
            <div className="">
                <p className="semi-bold">Please provide a reason for rejection:</p>
                <textarea
                    className="border-radius-12"
                    rows="5"
                    name="reason"
                    value={rejectReason}
                    style={{
                        border: "10px solid transparent",
                        outline: "2px solid transparent",
                        minHeight: "100px",
                        backgroundColor: "#f2f4fd",
                    }}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter your reason here..."
                ></textarea>
            </div>
            <div className="flex justify-end gap-1">
                <button
                    className="green btn-small"
                    disabled={rejectReason === ""}
                    onClick={() =>
                        dispatch(
                            rejectWithdrawalRequest(WithdrawalDetails?._id, rejectReason)
                        )
                    }
                >
                    {requestLoading ? <ClipLoader color="white" size={20} /> : "Confirm"}
                </button>

                <button
                    className="red btn-small"
                    onClick={() => setOpenRejectModal(false)}
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default RejectWithdrawalModel;
