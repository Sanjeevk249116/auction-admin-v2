import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getAdminList = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_ADMIN_LIST_LOADING" });
    try {
        const { data } = await auction.get(
            `/account/read/admin/all-admins-accounts`
        );
        dispatch({ type: "GET_ALL_ADMIN_LIST_SUCCESS", payload: data });
    } catch (error) {
        notifyError(
            error.response ? error.response?.data : error.message,
            error.response?.status
        );
        dispatch({ type: "GET_ALL_ADMIN_LIST_FAILED" });
    }
};



export const blockAdminAccount = (adminId, setInactiveOpenModal) => async (dispatch) => {
    dispatch({ type: "BLOCK_ADMIN_ACCOUNT_LOADING" });
    try {
        const { data } = await auction.put(
            `/account/update/bloack-admin-account/${adminId}`
        );
        dispatch({ type: "BLOCK_ADMIN_ACCOUNT_SUCCESS", payload: data });
        notifySuccess("Admin account blocked successfully.");
        dispatch(getAdminList());
        setInactiveOpenModal(false); // Close the modal after blocking
    } catch (error) {
        notifyError(
            error.response ? error.response?.data : error.message,
            error.response?.status
        );
        dispatch({ type: "BLOCK_ADMIN_ACCOUNT_FAILED" });
    }
};


export const unBlockAdminAccount = (adminId, setActiveOpenModal) => async (dispatch) => {
    dispatch({ type: "UNBLOCK_ADMIN_ACCOUNT_LOADING" });
    try {
        const { data } = await auction.put(
            `/account/update/unbloack-admin-account/${adminId}`
        );
        dispatch({ type: "UNBLOCK_ADMIN_ACCOUNT_SUCCESS", payload: data });
        notifySuccess("Admin account unblocked successfully.");
        dispatch(getAdminList());
        setActiveOpenModal(false); // Close the modal after unblocking
    } catch (error) {
        notifyError(
            error.response ? error.response?.data : error.message,
            error.response?.status
        );
        dispatch({ type: "UNBLOCK_ADMIN_ACCOUNT_FAILED" });
    }
};
