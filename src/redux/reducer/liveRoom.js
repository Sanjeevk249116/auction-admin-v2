const initailState = {
    liveAuctionListData: {},
    liveBiddingHistry: {},
    auctionLoading: false,
    liveRoomSingleAuctionLoading: false,
    liveRoomSingleAuctionData: {},
    biderActivity: {},
    minimumBidUpdateLoading: false,
    startingPriceLoading: false,
};

export function liveAuctionListReducer(state = initailState, { type, payload }) {
    switch (type) {
        case "LIVE_AUCTION_LIST_LOADING":
            return { ...state, auctionLoading: true };
        case "LIVE_AUCTION_LIST_SUCCESS":
            return { ...state, auctionLoading: false, liveAuctionListData: payload };
        case "LIVE_AUCTION_LIST_FAILED":
            return { ...state, auctionLoading: false, liveAuctionListData: {} };
        case "LIVE_AUCTION_HISTORY_SUCCESS":
            return { ...state, auctionLoading: false, liveBiddingHistry: payload };
        case "SINGLE_AUCTION_LIVE_LOADING":
            return { ...state, liveRoomSingleAuctionLoading: true, };
        case "SINGLE_AUCTION_LIVE_SUCCESS":
            return { ...state, liveRoomSingleAuctionLoading: false, liveRoomSingleAuctionData: payload };
        case "SINGLE_AUCTION_LIVE_FAILED":
            return { ...state, liveRoomSingleAuctionLoading: false, };
        case "SINGLE_AUCTION_LIVE_ACTIVITY_SUCCESS":
            return { ...state, liveRoomSingleAuctionLoading: false, biderActivity: payload };
        case "SINGLE_AUCTION_MINIMUMBID_LOADING":
            return { ...state, minimumBidUpdateLoading: true };
        case "SINGLE_AUCTION_MINIMUMBID_SUCCESS":
            return { ...state, minimumBidUpdateLoading: false };
        case "SINGLE_AUCTION_MINIMUMBID_FAILED":
            return { ...state, minimumBidUpdateLoading: false };
        case "SINGLE_AUCTION_STARTINGPRICE_LOADING":
            return { ...state, startingPriceLoading: true };
        case "SINGLE_AUCTION_STARTINGPRICE_SUCCESS":
            return { ...state, startingPriceLoading: false };
        case "SINGLE_AUCTION_STARTINGPRICE_FAILED":
            return { ...state, startingPriceLoading: false };
        default:
            return state;
    }
}