import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getTraderWallet = (id) => async (dispatch) => {
  dispatch({ type: "TRADER_WALLET_FETCHING" });
  try {
    const { data } = await auction.get(`/wallet/read/single-wallet/${id}`);
    dispatch({ type: "TRADER_WALLET_SUCCESS", payload: data });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "CANNOT_TRADER_WALLET" });
  }
};

export const verifyWalletAccount = (bankId, id) => async (dispatch) => {
  dispatch({ type: "VERIFY_BANK_LOADING" });
  try {
    const { data } = await auction.put(
      `/wallet/update/verify-bank-account/${bankId}`
    );
    dispatch({ type: "VERIFY_BANK_SUCCESS", payload: data });
    dispatch(getTraderWallet(id));
    notifySuccess("Bank account verified successfully");
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "VERIFY_BANK_FAILED" });
  }
};

export const unverifyWalletAccount = (bankId, id) => async (dispatch) => {
  dispatch({ type: "UNVERIFY_BANK_LOADING" });
  try {
    const { data } = await auction.put(
      `/wallet/update/unverify-bank-account/${bankId}`
    );
    dispatch({ type: "UNVERIFY_BANK_SUCCESS", payload: data });
    dispatch(getTraderWallet(id));
    notifySuccess("Bank account rejected successfully");
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "UNVERIFY_BANK_FAILED" });
  }
};

export const getAllWithdrawalRequestAccounts = () => async (dispatch) => {
  dispatch({ type: "WITHDRAWAL_REQUEST_LOADING" });
  try {
    const { data } = await auction.get(`/payment/read/all-withdrawal-request`);
    dispatch({ type: "WITHDRAWAL_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "WITHDRAWAL_REQUEST_FAILED" });
  }
};

export const accepttWithdrawalRequest = (withdrawalId) => async (dispatch) => {
  dispatch({ type: "CONFIRM_WITHDRAWAL_LOADING" });
  try {
    const { data } = await auction.put(
      `/wallet/update/admin/approve-withdrawal-request/${withdrawalId}`
    );
    dispatch({ type: "CONFIRM_WITHDRAWALS_SUCCESS", payload: data });
    dispatch(getAllWithdrawalRequestAccounts());
    notifySuccess("Withdrawal request accepted successfully.");
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "CONFIRM_WITHDRAWAL_FAILED" });
  }
};


export const rejectWithdrawalRequest =
  (withdrawalId, reason) => async (dispatch) => {
    dispatch({ type: "REJECT_WITHDRAWAL_LOADING" });
    try {
      const { data } = await auction.put(
        `/wallet/update/admin/reject-withdrawal-request/${withdrawalId}`,
        { rejectionReason: reason }
      );
      dispatch({ type: "REJECT_WITHDRAWAL_SUCCESS", payload: data });
      dispatch(getAllWithdrawalRequestAccounts());
      notifySuccess("Withdrawal request rejected successfully.");
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "REJECT_WITHDRAWAL_FAILED" });
    }
  };

export const confirmWithdrawalAccount =
  (selectedAccount, navigate) => async (dispatch) => {
    dispatch({ type: "CONFIRM_WITHDRAWAL_LOADING" });
    try {
      dispatch({
        type: "CONFIRM_WITHDRAWAL_SUCCESS",
        payload: selectedAccount,
      });
      navigate("/withdrawal-confirmation");
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "CONFIRM_WITHDRAWAL_FAILED" });
    }
  };

export const withdrawalRequestOTP =
  (withDrawalList, setOpenOtpModel) => async (dispatch) => {
    dispatch({ type: "WITHDRAWAL_REQUEST_OTP_LOADING" });
    try {
      const { data } = await auction.post(`/payment/create/cib/request-otp`, {
        withDrawalList,
      });
      setOpenOtpModel(true);
      dispatch({ type: "WITHDRAWAL_REQUEST_OTP_SUCCESS", payload: data });
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "WITHDRAWAL_REQUEST_OTP_FAILED" });
    }
  };

export const verifyOTPandInitiateTranscation =
  (
    otpCode,
    transcationId,
    setConfirmSelectedAccount,
    setOpenOtpModel,
    navigate
  ) =>
    async (dispatch) => {
      dispatch({ type: "WITHDRAWAL_OTP_VERIFICATION_LOADING" });
      console.log({ otpCode })
      try {
        const { data } = await auction.post(
          `/payment/create/cib/initiate-transaction/${transcationId}`,
          { otpCode }
        );
        setOpenOtpModel(false);
        setConfirmSelectedAccount([]);
        dispatch({ type: "WITHDRAWAL_OTP_VERIFICATION_SUCCESS", payload: data });
        notifySuccess("Transaction initiated successfully.");
        navigate("/transaction");
      } catch (error) {
        notifyError(
          error.response ? error.response?.data : error.message,
          error.response?.status
        );
        dispatch({ type: "WITHDRAWAL_OTP_VERIFICATION_FAILED" });
      }
    };
