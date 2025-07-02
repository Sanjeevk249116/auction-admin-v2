export const singleAuctionReducer = (
  state = { singleAuctionData: {}, singleAuctionLoading: false },
  { type, payload }
) => {
  switch (type) {
    case "SINGLE_AUCTION_FETCHING":
      return { ...state, singleAuctionLoading: true };
    case "SINGLE_AUCTION_SUCCESS":
      return {
        ...state,
        singleAuctionData: payload,
        singleAuctionLoading: false,
      };
    case "CANNOT_SINGLE_AUCTION":
      return { ...state, singleAuctionLoading: false };

    default:
      return state;
  }
};

export const auctionReducer = (
  state = {
    createAuctionData: {},
    createObjectData: {},
    createAuctionLoading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "CREATE_AUCTION_FETCHING":
      return { ...state, createAuctionLoading: true };
    case "CREATE_AUCTION_SUCCESS":
      return {
        ...state,
        createAuctionData: payload,
        createAuctionLoading: false,
      };
    case "CREATE_OBJECT_SUCCESS":
      return {
        ...state,
        createObjectData: payload,
        createAuctionLoading: false,
      };
    case "CANNOT_CREATE_AUCTION":
      return { ...state, createAuctionLoading: false };

    default:
      return state;
  }
};

export const rescheduleAuctionReducer = (
  state = { auctionData: {}, auctionLoading: false },
  { type, payload }
) => {
  switch (type) {
    case "RESCHEDULE_AUCTION_FETCHING":
      return { ...state, auctionLoading: true };
    case "RESCHEDULE_AUCTION_SUCCESS":
      return { ...state, auctionData: payload, auctionLoading: false };
    case "CANNOT_RESCHEDULE_AUCTION":
      return { ...state, auctionLoading: false };

    default:
      return state;
  }
};
