import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getMaterialClassification = () => async (dispatch) => {
    dispatch({ type: "MATERIAL_CLASSIFICATIONS_LOADING" });
    try {
        const { data } = await auction.get("/material-classification/read")
        dispatch({ type: "MATERIAL_CLASSIFICATION_SUCCESS", payload: data });

    } catch (error) {
        notifyError(error.response ? error.response?.data : error.message, error.response?.status);
        dispatch({ type: "MATERIAL_CLASSIFICATIONS_FAILED" });
    }
};


export const updateMaterialClassification = (scarpMaterial, setSelectedScrap) => async (dispatch) => {
    dispatch({ type: "UPDATE_MATERIAL_CLASSIFICATION_LOADING" });
    try {
        const { data } = await auction.post("/material-classification/create", { materialClassification: scarpMaterial })
        dispatch({ type: "UPDATE_MATERIAL_CLASSIFICATION_SUCCESS", });
        notifySuccess(data)
        dispatch(getMaterialClassification())
        setSelectedScrap([""])
    } catch (error) {
        notifyError(error.response ? error.response?.data : error.message, error.response?.status);
        dispatch({ type: "UPDATE_MATERIAL_CLASSIFICATION_FAILED" });
    }
};

export const deleteMaterialClassification = (id, setModalOpen, setScrapItem) => async (dispatch) => {
    dispatch({ type: "DELETE_MATERIAL_CLASSIFICATION_LOADING" });
    try {
        const { data } = await auction.delete(`/material-classification/delete/${id}`)
        dispatch({ type: "DELETE_MATERIAL_CLASSIFICATION_SUCCESS", });
        notifySuccess(data?.message)
        setScrapItem("")
        dispatch(getMaterialClassification())
        setModalOpen(false)

    } catch (error) {
        notifyError(error.response ? error.response?.data : error.message, error.response?.status);
        dispatch({ type: "DELETE_MATERIAL_CLASSIFICATION_FAILED" });
    }
};