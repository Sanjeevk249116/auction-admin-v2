import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getSingleAccount = (id) => async (dispatch) => {
  dispatch({ type: "SINGLE_ACCOUNT_FETCHING" });
  try {
    const { data } = await auction.get(`/profile/read/single-account/${id}`);
    dispatch({ type: "SINGLE_ACCOUNT_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "CANNOT_FETCH_SINGLE_ACCOUNT" });
  }
};


export const verifiedPCBAccount = (orgID, setIsModalOpen) => async (dispatch) => {
  dispatch({ type: "PCB_ACCOUNT_VERIFY_LOADING" });
  try {
    const { data } = await auction.put(
      `/account/update/admin/verify-pcb-account/${orgID}`,
    );
    dispatch({ type: "PCB_ACCOUNT_VERIFY_SUCCESS", payload: data });
    notifySuccess("PCB Account verified successfully.");
    dispatch(getSingleAccount(orgID));
    setIsModalOpen(false);
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "PCB_ACCOUNT_VERIFY_FAILED" });
  }
}

