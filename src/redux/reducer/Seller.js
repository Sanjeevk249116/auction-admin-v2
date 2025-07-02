export const sellerListReducer = (
  state = { sellerList: [], sellerListLoading: false },
  { type, payload }
) => {
  switch (type) {
    case "SELLER_LIST_FETCHING":
      return { ...state, sellerListLoading: true };
    case "SELLER_LIST_SUCCESS":
      return { ...state, sellerList: payload, sellerListLoading: false };
    case "CANNOT_FETCH_SELLERLIST":
      return { ...state, sellerListLoading: false };
    case "INVITE_SELLER_LOADING":
      return { ...state, sellerListLoading: true };
    case "INVITE_SELLER_SUCCESS":
      return { ...state, sellerListLoading: false };
    case "INVITE_SELLER_FAILED":
      return { ...state, sellerListLoading: false };

    default:
      return state;
  }
};
