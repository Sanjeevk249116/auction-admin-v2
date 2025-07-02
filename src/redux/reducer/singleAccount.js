export const singleAccountReducer = (
  state = {
    singleAccountdata: [],
    singleAccountLoading: false,
    pcbVerifyLoading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "SINGLE_ACCOUNT_FETCHING":
      return { ...state, singleAccountLoading: true };
    case "SINGLE_ACCOUNT_SUCCESS":
      return {
        ...state,
        singleAccountdata: payload,
        singleAccountLoading: false,
      };
    case "CANNOT_FETCH_SINGLE_ACCOUNT":
      return { ...state, singleAccountLoading: false };
    case "PCB_ACCOUNT_VERIFY_LOADING":
      return { ...state, pcbVerifyLoading: true };
    case "PCB_ACCOUNT_VERIFY_SUCCESS":
      return { ...state, pcbVerifyLoading: false };
    case "PCB_ACCOUNT_VERIFY_FAILED":
      return { ...state, pcbVerifyLoading: false };
    default:
      return state;
  }
};
