import { notifyError } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getAdminAnalytics = () => async (dispatch) => {
    dispatch({ type: "ADMIN_ANALYTICS_LOADING" });
    try {
        const { data } = await auction.get(`/profile/read/admin-analytics`);
        dispatch({ type: "ADMIN_ANALYTICS_SUCCESS", payload: data });
    } catch (error) {
        notifyError(
            error.response ? error.response?.data : error.message,
            error.response?.status
        );
        dispatch({ type: "ADMIN_ANALYTICS_FAILED" });
    }
};
