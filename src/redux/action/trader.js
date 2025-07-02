import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const listOfAllTraders =
  (currentPage, totalNumberRow) => async (dispatch) => {
    const skip = (currentPage - 1) * totalNumberRow;
    dispatch({ type: "TRADERS_LIST_FETCHING" });
    try {
      const { data } = await auction.get(
        `/profile/read/all-traders?skip=${skip}&limit=${totalNumberRow}`
      );
      dispatch({ type: "TRADERS_LIST_SUCCESS", payload: data });
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "CANNOT_FETCH_TRADERSLIST" });
    }
  };


export const inviteNewTraderInAdmin =
  (inviteNewTrader, navigate, setInviteNewTrader) => async (dispatch) => {
    dispatch({ type: "INVITE_NEW_TRADER_LOADING" });
    try {
      const { data } = await auction.post(`/authenticate/invte-trader`, inviteNewTrader);
      dispatch({ type: "INVITE_NEW_TRADER_SUCCESS", payload: data });
      setInviteNewTrader({
        organizationName: "",
        location: {},
        GSTIN: "",
        email: "",
        name: "",
        phoneNumber: ""
      });
      notifySuccess("trader invited successfully");
      navigate("/trader-collection")
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "INVITE_NEW_TRADER_FAILED" });
    }
  };