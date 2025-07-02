export const tradersWalletReducer = (
  state = {
    traderWallet: {},
    tradersWalletLoading: false,
    bankVerifyLoading: false,
    bankUnVerifyLoading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "TRADER_WALLET_FETCHING":
      return { ...state, tradersWalletLoading: true };
    case "TRADER_WALLET_SUCCESS":
      return { ...state, traderWallet: payload, tradersWalletLoading: false };
    case "CANNOT_TRADER_WALLET":
      return { ...state, tradersWalletLoading: false, traderWallet: {} };
    case "VERIFY_BANK_LOADING":
      return { ...state, bankVerifyLoading: true };
    case "VERIFY_BANK_SUCCESS":
      return { ...state, bankVerifyLoading: false };
    case "VERIFY_BANK_FAILED":
      return { ...state, bankVerifyLoading: false };
    case "UNVERIFY_BANK_LOADING":
      return { ...state, bankUnVerifyLoading: true };
    case "UNVERIFY_BANK_SUCCESS":
      return { ...state, bankUnVerifyLoading: false };
    case "UNVERIFY_BANK_FAILED":
      return { ...state, bankUnVerifyLoading: false };
    case "CONFIRM_WITHDRAWAL_SUCCESS":
      return { ...state, selectedAccount: payload };

    default:
      return state;
  }
};

export const withdrawalRequestReducer = (
  state = {
    selectedAccount: [],
    withdrawalAccounts: [],
    withdrawalRequestLoading: false,
    requestLoading: false,
    otpDetail: {},
    otpRequestLoading: false,
    otpVerificationLoading: false
  },
  { type, payload }
) => {
  switch (type) {
    case "CONFIRM_WITHDRAWAL_SUCCESS":
      return { ...state, selectedAccount: payload, requestLoading: false };
    case "CONFIRM_WITHDRAWAL_LOADING":
      return { ...state, requestLoading: true };
    case "CONFIRM_WITHDRAWALS_SUCCESS":
      return { ...state, requestLoading: false };
    case "CONFIRM_WITHDRAWAL_FAILED":
      return { ...state, requestLoading: false };
    case "WITHDRAWAL_REQUEST_LOADING":
      return { ...state, withdrawalRequestLoading: true };
    case "WITHDRAWAL_REQUEST_SUCCESS":
      return { ...state, withdrawalAccounts: payload, withdrawalRequestLoading: false };
    case "WITHDRAWAL_REQUEST_FAILED":
      return { ...state, withdrawalRequestLoading: false };
    case "REJECT_WITHDRAWAL_LOADING":
      return { ...state, requestLoading: true };
    case "REJECT_WITHDRAWAL_SUCCESS":
      return { ...state, requestLoading: false };
    case "REJECT_WITHDRAWAL_FAILED":
      return { ...state, requestLoading: false };
    case "WITHDRAWAL_REQUEST_OTP_LOADING":
      return { ...state, otpRequestLoading: true };
    case "WITHDRAWAL_OTP_VERIFICATIONSUCCESS":
      return { ...state, otpRequestLoading: false };
    case "WITHDRAWAL_REQUEST_OTP_FAILED":
      return { ...state, otpRequestLoading: false, otpDetail: {} };
    case "WITHDRAWAL_REQUEST_OTP_SUCCESS":
      return { ...state, otpRequestLoading: false, otpDetail: payload };
    case "WITHDRAWAL_OTP_VERIFICATION_LOADING":
      return { ...state, otpVerificationLoading: true };
    case "WITHDRAWAL_OTP_VERIFICATION_FAILED":
      return { ...state, otpVerificationLoading: false, };
    case "WITHDRAWAL_OTP_VERIFICATION_SUCCESS":
      return { ...state, otpVerificationLoading: false, };


    default:
      return state;
  }
};
