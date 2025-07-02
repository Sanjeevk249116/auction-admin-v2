import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const detailsOfSingleOffer = (id) => async (dispatch) => {
  dispatch({ type: "FETCHING_OFFER_DETAILS" });
  try {
    const { data } = await auction.get(
      `/auction/read/admin/single-offer/${id}`
    );
    dispatch({ type: "SUCCESS_OFFER_DETAILS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "CANNOT_OFFER_DETAILS" });
  }
};

export const deleteLotDetailsFromAuction = (auctionId, offerId, closeModel, navigate) => async (dispatch) => {
  dispatch({ type: "DELETE_LOT_LOADING" });
  try {
    const { data } = await auction.delete(
      `/auction/delete/delete-offer/${auctionId}/${offerId}`
    );
    notifySuccess("Lot Deleted Successfully");
    dispatch({ type: "DELETE_LOT_SUCCESS", payload: data });
    closeModel(false);
    navigate(-1);
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "DELETE_LOT_FAILED" });
  }
};


