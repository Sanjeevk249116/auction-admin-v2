import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";
import { getSingleAccount } from "./singleAccount";

export const updateVerifyAccount =
  (id, setIsModalOpen) => async (dispatch) => {
    dispatch({ type: "SHOW_VERIFY_ACCOUNT" });
    try {
      const { data } = await auction.put(
        `/profile/update/admin/verify-account/${id}`,

      );
      dispatch({ type: "VERIFY_ACCOUNT_SUCCESS", payload: data });
      notifySuccess("Account verified successfully");
      setIsModalOpen(false);
        dispatch(getSingleAccount(id));
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "CANNOT_VERIFY_ACCOUNT" });
    }
  };
