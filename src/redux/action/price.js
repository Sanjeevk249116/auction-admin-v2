import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";
import { getSingleAuction } from "./auction";

export const startingPriceForApproval =
  (auctionID, offers, navigate, setOfferprice) => async (dispatch) => {
    dispatch({ type: "STARTING_PRICE_LOADING" });
    try {
      const { data } = await auction.put(
        `/auction/update/add-starting-price/${auctionID}`,
        { offers }
      );
      dispatch({ type: "STARTING_PRICE_SUCCESS", payload: data });
      notifySuccess("Starting price has been updated");
      setOfferprice([{ startingPrice: "", offer: "" }]);
      navigate(-1);
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "STARTING_PRICE_FAILED" });
    }
  };

export const startingPriceApproval = (auctionID) => async (dispatch) => {
  dispatch({ type: "STARTING_PRICE_APPROVED_LOADING" });
  try {
    const { data } = await auction.put(
      `/auction/update/admin/starting-price-approval/${auctionID}`
    );
    dispatch({ type: "STARTING_PRICE_APPROVED_SUCCESS", payload: data });
    notifySuccess("Starting price has been approved");
    dispatch(getSingleAuction(auctionID));
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "STARTING_PRICE_APPROVED_FAILED" });
  }
};
