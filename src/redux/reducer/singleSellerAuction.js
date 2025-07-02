const initialStatus = {
  sellerAuctionCollection: [],
  loading: false,
};

export const singleSellerAuctionReducer = (
  state = initialStatus,
  { type, payload }
) => {
  switch (type) {
    case "SINGLE_SELLER_FETCHING":
      return { ...state, loading: true };
    case "SINGLE_SINGLE_SUCCESS":
      return { ...state, loading: false, sellerAuctionCollection: payload };
    case "CANNOT_FETCH_SINGLE_SELLER":
      return { ...state, loading: false };
    default:
      return state;
  }
};
