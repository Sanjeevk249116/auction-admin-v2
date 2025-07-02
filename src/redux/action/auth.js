import { notifyError } from "../../helper/helpers";
import { auction, Auth } from "../config/urlConfig";

export const loginUser = (medium, password) => async (dispatch) => {
  dispatch({ type: "LOGGING_IN" });
  try {
    const { data: token } = await Auth.post("/account/login/step-1", {
      medium: medium,
      password: password,
    });

    try {
      const config = { headers: { "X-Authentication-Token": token } };
      const { data } = await auction.post("/authenticate/admin", {}, config);
      auction.defaults.headers.common["X-Authentication-Token"] = data;
      dispatch({ type: "HIDE_LOADING" });
      localStorage.setItem("admin_dashboard", data);
      window.location.href = "/";
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message, error.response?.status);
      dispatch({ type: "CANNOT_LOGIN" });
    }
  } catch (error) {
    dispatch({ type: "CANNOT_LOGIN" });
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
  }
};

export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: "GET_USER_PROFILE" });
  try {
    const { data } = await auction.get("/profile/read");
    dispatch({ type: "GET_USER_PROFILE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_USER_PROFILE_FAILEDS" });
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
  }
};

export const getAdminDetails = () => async (dispatch) => {
  dispatch({ type: "GET_ADMIN_DETAILS_LOADING" });
  try {
    const { data } = await auction.get("/account/read/admin/my-account");
    dispatch({ type: "GET_ADMIN_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ADMIN_DETAILS_FAILED" });
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
  }
};


export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOGGING_OUT" });
  try {
    await auction.put(`/authenticate/logout`);
    dispatch({ type: "LOGOUT_SUCCESS" });
    localStorage.removeItem("admin_dashboard");
    window.location.href = "/";
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "CANNOT_LOGOUT" });
  }
};
