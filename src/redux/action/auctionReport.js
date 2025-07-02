import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";
import { getSingleAuction } from "./auction";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

export const postAuctionReportsWithRejectedLots =
  (
    id,
    acceptedOffers,
    rejectedOffers,
    rejectedMessage,
    setIsModelOpen,
    setAcceptedOffers,
    setRejectedOffers,
    setRemoveOSelectedOffers
  ) =>
  async (dispatch) => {
    dispatch({ type: "AUCTION_REPORT_LOADING" });
    try {
      const { data } = await auction.put(
        `/auction/update/admin/reject-auction-report/${id}`,
        { acceptedOffers, rejectedOffers, rejectedMessage }
      );
      dispatch({ type: "AUCTION_REPORT_SUCCESS", payload: data });
      notifySuccess("Auction report submitted successfully");
      setAcceptedOffers([]);
      setRejectedOffers([]);
      setIsModelOpen(false);
      dispatch(getSingleAuction(id));
      setRemoveOSelectedOffers((pre) => !pre);
    } catch (error) {
      dispatch({ type: "AUCTION_REPORT_FAILED" });
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
    }
  };

export const postAuctionReportsWithAcceptedLots =
  (
    id,
    acceptedOffers,
    setIsModelOpen,
    setAcceptedOffers,
    setRejectedOffers,
    setRemoveOSelectedOffers
  ) =>
  async (dispatch) => {
    dispatch({ type: "AUCTION_REPORT_LOADING" });
    try {
      const { data } = await auction.put(
        `/auction/update/admin/accept-auction-report/${id}`,
        { acceptedOffers }
      );
      dispatch({ type: "AUCTION_REPORT_SUCCESS", payload: data });
      notifySuccess("Auction report submitted successfully");
      setAcceptedOffers([]);
      setRejectedOffers([]);
      setIsModelOpen(false);
      dispatch(getSingleAuction(id));
      setRemoveOSelectedOffers((pre) => !pre);
    } catch (error) {
      dispatch({ type: "AUCTION_REPORT_FAILED" });
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
    }
  };

export const generateAuctionReportForSingleAuction =
  (id) => async (dispatch) => {
    dispatch({ type: "GENERATE_AUCTION_REPORT_LOADING" });
    try {
      const response = await auction.post(
        `/auction/create/generate-auction-report/${id}`
      );
      dispatch({
        type: "GENERATE_AUCTION_REPORT_SUCCESS",
        payload: response.data,
      });
      notifySuccess("Auction report generated successfully.");
      dispatch(getSingleAuction(id));
    } catch (error) {
      dispatch({ type: "GENERATE_AUCTION_REPORT_FAILED" });
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
    }
  };

export const getAuctionReportPdf = (id) => async (dispatch) => {
  dispatch({ type: "GET_AUCTION_REPORT_LOADING" });
  try {
    const response = await auction.get(
      `/auction/read/auction-reports?auctionId=${id}`,
      {
        responseType: "blob",
      }
    );
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    dispatch({ type: "GET_AUCTION_REPORT_SUCCESS", payload: pdfUrl });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "GET_AUCTION_REPORT_FAILED" });
  }
};

export const downloadAuctionReportPdf = (id) => async (dispatch) => {
  const toastID = toast.loading("please wait..");
  dispatch({ type: "SHOW_LOADING_DOWNLOAD" });
  try {
    const response = await auction.get(
      `/auction/read/auction-reports?auctionId=${id}`,
      {
        responseType: "blob",
      }
    );
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    saveAs(pdfBlob, "Auction-Report");
    dispatch({ type: "GET_DOWNLOAD_REPORT_DATA" });
    toast.update(toastID, {
      render: "File downloaded successfully",
      isLoading: false,
      autoClose: 5000,
      type: "success",
    });
  } catch (error) {
    toast.update(toastID, {
      render: "Failed to download",
      isLoading: false,
      autoClose: 5000,
      type: "error",
    });
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "HIDE_LOADING_REPORT_DOWNLOAD" });
  }
};
