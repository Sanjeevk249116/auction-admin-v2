import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getCordinatore = () => async (dispatch) => {
  dispatch({ type: "SHOW_LOADING_CORDINATOR" });
  try {
    const { data } = await auction.get("/coordinator/read");
    dispatch({ type: "CORDINATOR_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_CORDINATOR" });
  }
};

export const getSingleCoordinator = (id) => async (dispatch) => {
  dispatch({ type: "SHOW_SINGLE_LOADING_CORDINATOR" });
  try {
    const { data } = await auction.get(`/coordinator/read/single-coordinator/${id}`);
    dispatch({ type: "SINGLE_CORDINATOR_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_SINGLE_CORDINATOR" });
  }
};

export const addCordinatore =
  (values, setIsModalOpen, cb) => async (dispatch) => {
    dispatch({ type: "SHOW_LOADING_CORDINATORS" });
    try {
      const { data } = await auction.post(`/coordinator/create`, values);
      dispatch({ type: "CORDINATOR_ADD_SUCCESS" });
      notifySuccess(data);
      dispatch(getCordinatore());
      if (cb) {
        cb();
      }
      setIsModalOpen(false);
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message,error.response?.status);
      dispatch({ type: "CANNOT_ADD_CORDINATOR" });
    }
  };

export const deleteCordinator = (id, setIsModalOpen) => async (dispatch) => {
  try {
    const { data } = await auction.delete(`/coordinator/delete/${id}`);
    notifySuccess(data);
    setIsModalOpen(false);
    dispatch(getCordinatore());
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message,error.response?.status);
    dispatch({ type: "CANNOT_CORDINATOR" });
  }
};

export const editCordinator =
  (id, values, setIsModalOpen, cb) => async (dispatch) => {
    dispatch({ type: "LOADING_EDIT_CORDINATOR" });
    try {
      const { data } = await auction.put(`/coordinator/update/${id}`, values);
      dispatch({ type: "EDIT_CORDINATOR_SUCCESS" });
      notifySuccess(data);
      setIsModalOpen(false);
      if (cb) {
        cb();
      }
      dispatch(getCordinatore());
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message,error.response?.status);
      dispatch({ type: "CANNOT_EDIT_CORDINATOR" });
    }
  };
