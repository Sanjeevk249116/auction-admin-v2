const initailState = {
    verifyAccountData: [],
    verifyAccountLoading: false,
  };
  
  export function verifyAccountReducer(state = initailState, { type, payload }) {
    switch (type) {
      case "VERIFY_ACCOUNT_SUCCESS":
        return { ...state, verifyAccountData: payload, verifyAccountLoading: false };
      case "SHOW_VERIFY_ACCOUNT":
        return { ...state, verifyAccountLoading: true };
      case "CANNOT_VERIFY_ACCOUNT":
        return { ...state, verifyAccountLoading: false };
    
      default:
        return state;
    }
  }