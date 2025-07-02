import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

//update api
export const getLiveAuctionList = () => async (dispatch) => {
  dispatch({ type: "LIVE_AUCTION_LIST_LOADING" });
  try {
    const { data } = await auction.get(
      "/live-auction/admin/read/all-live-auctions"
    );
    dispatch({ type: "LIVE_AUCTION_LIST_SUCCESS", payload: data });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "LIVE_AUCTION_LIST_FAILED" });
  }
};

//update api
export const getSingleAuctionLiveRoom = (auctionId) => async (dispatch) => {
  dispatch({ type: "SINGLE_AUCTION_LIVE_LOADING" });
  try {
    const { data } = await auction.get(
      `/live-auction/admin/read/single-live-auction/${auctionId}`
    );
    dispatch({ type: "SINGLE_AUCTION_LIVE_SUCCESS", payload: data });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "SINGLE_AUCTION_LIVE_FAILED" });
  }
};

//update api
export const updateSingleLotMinimumBid =
  (auctionId, offerId, minimumBid) => async (dispatch) => {
    dispatch({ type: "SINGLE_AUCTION_MINIMUMBID_LOADING" });
    try {
      await auction.put(
        `/auction/update/admin/minimum-bid/${auctionId}/${offerId}`,
        { minimumBid }
      );
      dispatch({ type: "SINGLE_AUCTION_MINIMUMBID_SUCCESS" });
      notifySuccess("Minimum Bid Updated Successfully");
      dispatch(getSingleAuctionLiveRoom(auctionId));
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "SINGLE_AUCTION_MINIMUMBID_FAILED" });
    }
  };

//update api
export const updateStartingPriceOfSingleLot =
  (auctionId, offerId, startingPrice, setIsOpenUpdateStartingPrice) =>
  async (dispatch) => {
    dispatch({ type: "SINGLE_AUCTION_STARTINGPRICE_LOADING" });
    try {
      await auction.put(
        `/auction/update/live-room/add-starting-price/${auctionId}`,
        { offerId: offerId, startingPrice: startingPrice }
      );
      dispatch({ type: "SINGLE_AUCTION_STARTINGPRICE_SUCCESS" });
      notifySuccess("Starting Price Updated Successfully.");
      setIsOpenUpdateStartingPrice(false);
      dispatch(getSingleAuctionLiveRoom(auctionId));
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "SINGLE_AUCTION_STARTINGPRICE_FAILED" });
    }
  };

//update api
export const bidderActivityInLiveRoom = (auctionId) => async (dispatch) => {
  dispatch({ type: "SINGLE_AUCTION_TRACKING_LOADING" });
  try {
    const { data } = await auction.get(
      `/live-auction/admin/read/live-participants/${auctionId}`
    );
    dispatch({ type: "SINGLE_AUCTION_LIVE_ACTIVITY_SUCCESS", payload: data });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "SINGLE_AUCTION_TRACKING_FAILED" });
  }
};

// export const getBidHistoryDetails = (actionId) => async (dispatch) => {
//   dispatch({ type: "LIVE_AUCTION_HISTORY_LOADING" });
//   try {
//     const { data } = await auction.get(`/auction/read/live-data?auctionId=${actionId}`)
//     dispatch({ type: "LIVE_AUCTION_HISTORY_SUCCESS", payload: data });
//   } catch (error) {
//     notifyError(error.response ? error.response?.data : error.message, error.response?.status);
//     dispatch({ type: "LIVE_AUCTION_HISTORY_FAILED" });
//   }
// };
