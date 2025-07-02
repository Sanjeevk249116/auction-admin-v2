import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";
import { getSingleAuction } from "./auction";
import { detailsOfSingleOffer } from "./offers";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export const approveSaleIntimation = (auctionId, offerId) => async (dispatch) => {
    dispatch({ type: "GET_SALE_INTIMATION_LOADING" });
    try {
        const { data } = await auction.put(`/auction/update/admin/accept-sale-intimation/${auctionId}/${offerId}`);
        notifySuccess("Sale intimation approved successfully");
        dispatch(getSingleAuction(auctionId));
        dispatch(detailsOfSingleOffer(offerId));
        dispatch({ type: "GET_SALE_INTIMATION_SUCCESS", payload: data });
    } catch (error) {
        notifyError(
            error.response ? error.response?.data : error.message,
            error.response?.status
        );
        dispatch({ type: "GET_SALE_INTIMATION_FAILED" });
    }
};

export const getSaleIntimationViewPdf = (id) => async (dispatch) => {
  dispatch({ type: "SHOW_SALE_LOADING_VIEW" });
  try {
    const response = await auction.get(`/documents/read/single-sale-intimation-file/${id}`, {
      responseType: "blob",
    });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    dispatch({ type: "GET_VIEW_SALE_DATA", payload: pdfUrl });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "HIDE_LOADING_SALE_VIEW" });
  }
};

export const downloadSaleIntimationPdf = (id) => async (dispatch) => {
  const toastID = toast.loading("please wait..");
  dispatch({ type: "GET_SALE_INTIMATION_LOADING" });
  try {
    const response = await auction.get(`/documents/read/single-sale-intimation-file/${id}`, {
      responseType: "blob",
    });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    saveAs(pdfBlob, "SaleIntimation");
    dispatch({ type: "GET_SALE_INTIMATION_SUCCESS" });
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
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "GET_SALE_INTIMATION_FAILED" });
  }
};