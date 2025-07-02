import { notifyError } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getAllEventAuction =
  (currentPage, totalNumberRow, auctionFilter) => async (dispatch) => {
    const skip = (currentPage - 1) * totalNumberRow;
    dispatch({ type: "SHOW_LOADING_AUCTION" });
    try {
      const { data } = await auction.get(
        `/auction/read/admin/all-events?auctionType=${auctionFilter}&skip=${skip}&limit=${totalNumberRow}`
      );
      dispatch({ type: "SUCCESS_FETCHING_AUCTION", payload: data });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("admin_dashboard");
        window.location.href = "/";
      } else {
        notifyError(error.response ? error.response?.data : error.message, error.response?.status);
        dispatch({ type: "CANNOT_FETCHING_AUCTION" });
      }
    }
  };

export const getTodayAuction =
  (currentPage, totalNumberRow, auctionFilter) => async (dispatch) => {
    const skip = (currentPage - 1) * totalNumberRow;
    dispatch({ type: "SHOW_LOADING_AUCTION" });
    try {
      const { data } = await auction.get(
        `/auction/read/admin/today-auctions?auctionType=${auctionFilter}&skip=${skip}&limit=${totalNumberRow}`
      );
      dispatch({ type: "SUCCESS_TODAY_AUCTION", payload: data });
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "CANNOT_FETCHING_AUCTION" });
    }
  };

export const getUpcomingAuction =
  (currentPage, totalNumberRow, auctionFilter) => async (dispatch) => {
    const skip = (currentPage - 1) * totalNumberRow;
    dispatch({ type: "SHOW_LOADING_AUCTION" });
    try {
      const { data } = await auction.get(
        `/auction/read/admin/upcoming-auctions?auctionType=${auctionFilter}&skip=${skip}&limit=${totalNumberRow}`
      );
      dispatch({ type: "SUCCESS_UPCOMING_AUCTION", payload: data });
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "CANNOT_FETCHING_AUCTION" });
    }
  };

export const getCompleteAuction =
  (currentPage, totalNumberRow, auctionFilter) => async (dispatch) => {
    const skip = (currentPage - 1) * totalNumberRow;
    dispatch({ type: "SHOW_LOADING_AUCTION" });
    try {
      const { data } = await auction.get(
        `/auction/read/admin/completed-auctions?auctionType=${auctionFilter}&skip=${skip}&limit=${totalNumberRow}`
      );
      dispatch({ type: "SUCCESS_COMPLETED_AUCTION", payload: data });
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "CANNOT_FETCHING_AUCTION" });
    }
  };

export const getPCBOfferAuction =
  (currentPage, totalNumberRow, auctionFilter) => async (dispatch) => {
    const skip = (currentPage - 1) * totalNumberRow;
    dispatch({ type: "SHOW_LOADING_AUCTION" });
    try {
      const { data } = await auction.get(
        `/auction/read/admin/pcb-offers?auctionType=${auctionFilter}&skip=${skip}&limit=${totalNumberRow}`
      );
      dispatch({ type: "SUCCESS_PCB_OFFERS", payload: data });
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "CANNOT_FETCHING_AUCTION" });
    }
  };
