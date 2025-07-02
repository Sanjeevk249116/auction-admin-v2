import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getAllSubscription = () => async (dispatch) => {
  dispatch({ type: "SUBSCRIPTION_FETCHING" });
  try {
    const { data } = await auction.get(`/subscription/read`);
    dispatch({ type: "SUBSCRIPTION_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_FETCH_SUBSCRIPTION" });
  }
};

export const getSingleSubscription = (id) => async (dispatch) => {
  dispatch({ type: "SINGLE_SUBSCRIPTION_FETCHING" });
  try {
    const { data } = await auction.get(`/subscription/read/single-plan/${id}`);
    dispatch({ type: "SINGLE_SUBSCRIPTION_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_FETCH_SINGLE_SUBSCRIPTION" });
  }
};

export const getAllArchiveSubscription = () => async (dispatch) => {
  dispatch({ type: "ARCHIVE_SUBSCRIPTION_FETCHING" });
  try {
    const { data } = await auction.get(`/subscription/read/archive`);
    dispatch({ type: "ARCHIVE_SUBSCRIPTION_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_FETCH_ARCHIVE_SUBSCRIPTION" });
  }
};

export const deleteSubscriptionPlan = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_SUBSCRIPTION_FETCHING" });
  try {
    const { data } = await auction.delete(`/subscription/delete/${id}`);
    dispatch({ type: "DELETE_SUBSCRIPTION_SUCCESS", payload: data });
    dispatch(getAllArchiveSubscription());
    notifySuccess("Subscription plan deleted successfully");
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_FETCH_DELETE_SUBSCRIPTION" });
  }
};


export const archiveSubscriptionPlan = (id, setArchiveModel) => async (dispatch) => {
  dispatch({ type: "ARCHIVE_SUBSCRIPTION_FETCHING" });
  try {
    const { data } = await auction.put(`/subscription/update/archive/${id}`);
    dispatch({ type: "ARCHIVE_PLAN_SUBSCRIPTION_SUCCESS", payload: data });
    notifySuccess("Subscription plan archive successfully");
    dispatch(getAllSubscription());
    setArchiveModel(false);
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_FETCH_ARCHIVE_SUBSCRIPTION" });
  }
};

export const unArchiveSubscriptionPlan = (id, setUnarchiveModel) => async (dispatch) => {
  dispatch({ type: "ARCHIVE_SUBSCRIPTION_FETCHING" });

  try {
    const { data } = await auction.put(`/subscription/update/unarchive/${id}`);
    dispatch({ type: "ARCHIVE_PLAN_SUBSCRIPTION_SUCCESS", payload: data });
    notifySuccess("Subscription plan unarchive successfully");
    setUnarchiveModel(false);
    dispatch(getAllArchiveSubscription());
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_FETCH_ARCHIVE_SUBSCRIPTION" });
  }
};

export const updateSubscription = (id, updateEditSubcription, setmodel) => async (dispatch) => {
  dispatch({ type: "ARCHIVE_SUBSCRIPTION_FETCHING" });
  try {
    const { data } = await auction.put(`/subscription/update/${id}`, updateEditSubcription);
    dispatch({ type: "ARCHIVE_PLAN_SUBSCRIPTION_SUCCESS", payload: data });
    notifySuccess("Subscription plan update successfully");
    setmodel(false)
    dispatch(getAllSubscription());
    dispatch(getSingleSubscription(id))
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_FETCH_ARCHIVE_SUBSCRIPTION" });
  }
};

export const createNewSubscriptionPlan = (newSubscriptionPlan, navigate) => async (dispatch) => {
  dispatch({ type: "ARCHIVE_SUBSCRIPTION_FETCHING" });
  try {
    const { data } = await auction.post(`/subscription/create/new-subscription`, newSubscriptionPlan);
    dispatch({ type: "ARCHIVE_PLAN_SUBSCRIPTION_SUCCESS", payload: data });
    notifySuccess("Subscription plan created successfully");
    navigate('/subscription')
    dispatch(getAllSubscription());
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_FETCH_ARCHIVE_SUBSCRIPTION" });
  }
};

export const adminPaySubscription = (planId,organizationId,navigate, setmodel) => async (dispatch) => {
  dispatch({ type: "ADMIN_PAID_SUBSCRIPTION_LOADING" });
  try {
    const { data } = await auction.put(`/profile/update/admin/subscription/${organizationId}/${planId}`);
    dispatch({ type: "ADMIN_PAID_SUBSCRIPTION_SUCCESS", payload: data });
    notifySuccess("Paid Subscription plan successfully");
    setmodel(false)
    navigate(`/single-organization-detail/${organizationId}`)
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "ADMIN_PAID_SUBSCRIPTION_FAILED" });
  }
}