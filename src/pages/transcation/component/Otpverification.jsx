import React, { useState } from "react";
import OTPInputInline from "../children/OTPInputInline";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "../../../helper/helpers";
import { verifyOTPandInitiateTranscation } from "../../../redux/action/wallet";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Otpverification({ setOpenOtpModel, setConfirmSelectedAccount }) {
  const dispatch = useDispatch();
  const length = 6;
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(length).fill(""));
  const { otpDetail, otpVerificationLoading } = useSelector(
    (state) => state.withdrawalRequest
  );

  const handleVerifyOtp = () => {
    if (otpDetail?.transaction === "")
      return notifyError(
        "Transaction not found. Please resend the otp request"
      );
    if (otp?.join("").length < length)
      return notifyError("Please enter a valid OTP");
    dispatch(
      verifyOTPandInitiateTranscation(
        otp?.join(''),
        otpDetail.transaction,
        setConfirmSelectedAccount,
        setOpenOtpModel,
        navigate
      )
    );
  };

  return (
    <div className="p-2">
      <p
        className={`valign-wrapper justify-center gap-10px red-text`}
        style={{
          backgroundColor: "#fddad8",
          padding: "8px 20px",
          borderRadius: "8px",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "22px", marginBottom: "2px" }}
        >
          info
        </span>
        <span>
          {" "}
          Please check all selected information is correct before proceeding
          with the OTP verification.
        </span>
      </p>
      <div className="valign-wrapper column gap-10px mt-2">
        <h5>OTP Verification</h5>
        <p>Please enter the OTP sent to your registered mobile number.</p>

        <OTPInputInline otp={otp} setOtp={setOtp} />
        <div className="flex justify-center gap-1 mt-1">
          <button
            className={`button-style pointer white-text green`}
            style={{ padding: "10px 40px" }}
            onClick={handleVerifyOtp}
          >
            {otpVerificationLoading ? (
              <ClipLoader color="white" size={20} />
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>
        <p>
          If you didn't receive the OTP, please check your mobile number or
          request a new one.{" "}
          <span className="blue-text pointer text-decoration-underLine">
            request again
          </span>
        </p>
      </div>
    </div>
  );
}

export default Otpverification;
