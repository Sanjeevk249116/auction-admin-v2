export const singleOfferReducer = (
    state = { singleOfferData: {}, offerDetailLoading: false ,deleteLoading: false},
    { type, payload }
  ) => {
    switch (type) {
      case "FETCHING_OFFER_DETAILS":
        return { ...state, offerDetailLoading: true };
      case "SUCCESS_OFFER_DETAILS":
        return { ...state, singleOfferData: payload, offerDetailLoading: false };
      case "CANNOT_OFFER_DETAILS":
        return { ...state, offerDetailLoading: false };
      case "DELETE_LOT_LOADING":
        return { ...state, deleteLoading: true };
      case "DELETE_LOT_SUCCESS":
        return { ...state, deleteLoading: false };
      case "DELETE_LOT_FAILED":
        return { ...state, deleteLoading: false };
  
      default:
        return state;
    }
  };