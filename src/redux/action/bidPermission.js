import { notifyError } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getBidderPermissionDetails = (id) => async (dispatch) => {
  dispatch({ type: "BIDDER_PERMISSION_LOADING" });
  try {
    const { data } = await auction.get(`/auction/read/admin/live-room-access/${id}`);
    dispatch({ type: "BIDDER_PERMISSION_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "BIDDER_PERMISSION_FAILED" });
  }
};

export const givePermissionForLiveRoom = (id, traderEmail, selectedOffers, navigate) => async (dispatch) => {
  dispatch({ type: "BIDDER_PERMISSION_LOADING" });
  try {
    const { data } = await auction.put(`/auction/update/admin/live-room-access/add/${id}`,{traderEmailId: traderEmail, offers: selectedOffers});
    dispatch({ type: "GIVE_BIDDER_PERMISSION_SUCCESS", payload: data });
    navigate(-1);
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "BIDDER_PERMISSION_FAILED" });
  }
};