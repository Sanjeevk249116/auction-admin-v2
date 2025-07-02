const initialStatus = {
  allEventCollection: [],
  todayAuctionCollection: [],
  upcomingAuctionCollection: [],
  pcbOfferCollection: [],
  completedAuctionCollection: [],
  loading: false,
};

export const auctionStatusReducer = (
  state = initialStatus,
  { type, payload }
) => {
  switch (type) {
    case "SHOW_LOADING_AUCTION":
      return { ...state, loading: true };
    case "SUCCESS_FETCHING_AUCTION":
      return { ...state, loading: false, allEventCollection: payload };
    case "SUCCESS_TODAY_AUCTION":
      return { ...state, loading: false, todayAuctionCollection: payload };
    case "SUCCESS_UPCOMING_AUCTION":
      return { ...state, loading: false, upcomingAuctionCollection: payload };
    case "SUCCESS_PCB_OFFERS":
      return { ...state, loading: false, pcbOfferCollection: payload };
      case "SUCCESS_COMPLETED_AUCTION":
        return { ...state, loading: false, completedAuctionCollection: payload };
    case "CANNOT_FETCHING_AUCTION":
      return { ...state, loading: false };
    default:
      return state;
  }
};
