import { auction } from "../config/urlConfig";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { notifyError, notifySuccess } from "../../helper/helpers";

export const getAllDocumentsData = (id) => async (dispatch) => {
  dispatch({ type: "SHOW_DOCUMENT_LOADING" });
  try {
    const { data } = await auction.get(
      `/documents/read/admin/all-documents/${id}`
    );
    dispatch({ type: "GET_ALL_DOCUMENT", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "SHOW_DOCUMENT_LOADDED" });
  }
};

export const downloadFile = (id, fileId, fileName) => async (dispatch) => {
  const toastID = toast.loading("please wait..");
  dispatch({ type: "DOWNLOADING_FILE" });
  try {
    const response = await auction.get(
      `/documents/read/single-file/${id}/${fileId}`,
      {
        responseType: "blob",
      }
    );
    const contentDisposition = response.headers["content-disposition"];
    let filename = fileName;
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch && filenameMatch.length === 2) {
        filename = filenameMatch[1];
      }
    }
    const blob = new Blob([response.data], { type: response.data.type });
    saveAs(blob, filename);
    toast.update(toastID, {
      render: "File downloaded successfully",
      isLoading: false,
      autoClose: 5000,
      type: "success",
    });
  } catch (error) {

    toast.update(toastID, {
      render: error.message,
      isLoading: false,
      autoClose: 5000,
      type: "error",
    });
    dispatch({ type: "FAILED_DOWNLOAD_FILE" });
  }
};

export const getViewDocument = (id, fileId) => async (dispatch) => {
  if (!fileId || !id) return
  dispatch({ type: "VIEW_DOCUMENT_LOADING" });
  try {
    const response = await auction.get(`/documents/read/single-file/${id}/${fileId}`, {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: response.data.type });
    const pdfUrl = URL.createObjectURL(blob);
    dispatch({ type: "VIEW_DOCUMENT_SUCCESS", payload: pdfUrl, fileType: response.data.type });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "VIEW_DOCUMENT_FAILED" });
  }
};

export const VerifyDocument = (id, fileId) => async (dispatch) => {
  dispatch({ type: "SHOW_CONFIRM" });
  try {
    await auction
      .put(`/documents/update/verify-document/${id}/${fileId}`)
    dispatch(getAllDocumentsData(id));
    notifySuccess("Document verified successfully");
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "CANNOT_CONFIRM" });
  }
};

export const rejectDocument = (id, fileId, rejectReason) => async (dispatch) => {
  dispatch({ type: "SHOW_REJECT" });
  try {
    await auction
      .put(`/documents/update/rejecte-document/${id}/${fileId}`, { rejectionReason: rejectReason })
    dispatch(getAllDocumentsData(id));
    notifySuccess("Document rejected successfully");

  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "CANNOT_REJECT" });
  }
};

export const deleteDocument = (id, fileId) => async (dispatch) => {
  dispatch({ type: "SHOW_REJECT" });
  try {
    await auction
      .delete(`documents/delete/admin/file/${id}/${fileId}`)
    dispatch(getAllDocumentsData(id));
    notifySuccess("Document deleted successfully.");
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "CANNOT_REJECT" });
  }
};
