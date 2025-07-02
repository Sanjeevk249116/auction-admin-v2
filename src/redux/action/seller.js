import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const listOfAllSeller =
  (currentPage, totalNumberRow) => async (dispatch) => {
    const skip = (currentPage - 1) * totalNumberRow;
    dispatch({ type: "SELLER_LIST_FETCHING" });
    try {
      const { data } = await auction.get(
        `/profile/read/all-sellers?skip=${skip}&limit=${totalNumberRow}`
      );
      dispatch({ type: "SELLER_LIST_SUCCESS", payload: data });
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "CANNOT_FETCH_SELLERLIST" });
    }
  };

export const inviteNewSellerForAuction = (InviteSeller, navigate, setInviteNewSeller) => async (dispatch) => {
  dispatch({ type: "INVITE_SELLER_LOADING" });
  try {
    const { data } = await auction.post(`/authenticate/invte-industry`, InviteSeller);
    dispatch({ type: "INVITE_SELLER_SUCCESS", payload: data });
    navigate("/seller-collection")
    notifySuccess("Seller invited successfully");
    setInviteNewSeller({
      organizationName: "",
      location: {},
      GSTIN: "",
      email: "",
      name: "",
      phoneNumber: ""
    })
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "INVITE_SELLER_FAILED" });
  }
};

