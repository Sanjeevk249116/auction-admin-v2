import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { getSingleAuction } from "./auction";

export const getCatelogueDetails = (id) => async (dispatch) => {
  dispatch({ type: "SHOW_LOADING_CATELOG" });
  try {
    const { data } = await auction.get(`/auction/read/auction-catalogue/${id}`);
    dispatch({ type: "GET_CATELOG_DATA", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "HIDE_LOADING_CATELOG" });
  }
};

export const getAllDetailOfcatalogue = (id) => async (dispatch) => {
  dispatch({ type: "SHOW_LOADING_CATELOG" });
  try {
    const { data } = await auction.get(`/catalogue/read/all-catalogues/${id}`);
    dispatch({ type: "GET_ALL_SELLER_CATELOGUE", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "HIDE_LOADING_CATELOG" });
  }
};

export const approvedCatelogue =
  (auctionId, catelogueId, setApprovedData, setIsModalOpen) =>
    async (dispatch) => {
      dispatch({ type: "SHOW_LOADING_CATELOG" });
      try {
        const { data } = await auction.put(
          `/catalogue/update/admin/catalogue-approvale/${auctionId}/${catelogueId}`
        );
        dispatch(getAllDetailOfcatalogue(auctionId));
        notifySuccess(data);
        setIsModalOpen(false);
        setApprovedData("");
        dispatch(getSingleAuction(auctionId));
        dispatch({ type: "APPROVE_CATELOGUE" });
      } catch (error) {
        notifyError(error.response ? error.response?.data : error.message, error.response?.status);
        dispatch({ type: "HIDE_LOADING_CATELOG" });
      }
    };

export const approvedNotCatelogue =
  (
    auctionId,
    catelogueId,
    massege,
    setNotApprovelData,
    setIsModalOpen,
    setReasonForReject
  ) =>
    async (dispatch) => {
      dispatch({ type: "SHOW_LOADING_CATELOG" });
      try {
        const { data } = await auction.put(
          `/catalogue/update/admin/catalogue-notApproval/${auctionId}/${catelogueId}`,
          massege
        );
        notifySuccess(data);
        setNotApprovelData("");
        setReasonForReject("");
        setIsModalOpen(false);
        dispatch(getAllDetailOfcatalogue(auctionId));
        dispatch({ type: "APPROVE_NOT_CATELOGUE" });
      } catch (error) {
        notifyError(error.response ? error.response?.data : error.message, error.response?.status);
        dispatch({ type: "HIDE_LOADING_CATELOG" });
      }
    };

export const getCatalogueViewPdf = (id) => async (dispatch) => {
  dispatch({ type: "SHOW_LOADING_VIEW" });
  try {
    const response = await auction.get(`/catalogue/read/single-file/${id}`, {
      responseType: "blob",
    });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    dispatch({ type: "GET_VIEW_CATELOG_DATA", payload: pdfUrl });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "HIDE_LOADING_CATELOG_VIEW" });
  }
};

export const downloadCateloguePdf = (id) => async (dispatch) => {
  const toastID = toast.loading("please wait..");
  dispatch({ type: "SHOW_LOADING_DOWNLOAD" });
  try {
    const response = await auction.get(`/catalogue/read/single-file/${id}`, {
      responseType: "blob",
    });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    saveAs(pdfBlob, "catalogue");
    dispatch({ type: "GET_DOWNLOAD_CATELOG_DATA" });
    toast.update(toastID, {
      render: "File downloaded successfully",
      isLoading: false,
      autoClose: 5000,
      type: "success",
    });
  } catch (error) {
    toast.update(toastID, {
      render: "Failed to download",
      isLoading: false,
      autoClose: 5000,
      type: "error",
    });
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "HIDE_LOADING_CATELOG_DOWNLOAD" });
  }
};

export const getCatalogueInformation = (id) => async (dispatch) => {
  dispatch({ type: "SHOW_CATALOGUE_INFO" });
  try {
    const { data } = await auction.get(
      `/catalogue/read/catalogue-details/${id}`
    );
    dispatch({ type: "SUCCESS_CATALOGUE_INFO", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "CANNOT_CATALOGUE_INFO" });
  }
};

export const uploadCateloguePdf = (id, catalogueFile, navigate, setCheckCatalogueSameData, setSelectcheckboxItem = false, setCatelogueInformation = false,) => async (dispatch) => {
  const toastID = toast.loading("please wait..");
  dispatch({ type: "SHOW_CATALOGUE_UPLOAD" });
  try {
    const { data } = await auction.put(
      `/catalogue/create/upload-catalogue/${id}`,
      catalogueFile
    );
    dispatch({ type: "SUCCESS_CATALOGUE_UPLOAD", payload: data });
    setCheckCatalogueSameData((prev) => !prev);
    if (setSelectcheckboxItem && setCatelogueInformation) {
      setSelectcheckboxItem({
        sellerCheckbox: false,
        auctionCheckbox: false,
        platformCheckbox: false,
        propertyCheckbox: false,
        termsCheckbox: false,
        onlineAuctionCheckbox: false,
      });
      setCatelogueInformation({
        sellerInformation: {
          companyName: "",
          companyAddress: "",
        },
        sellerTermsAndCondition: "",
        onlineAuctionCondition: "",
        auctionSupportServices: "",
        auctionInformation: [],
        companyDetails: "",
        membershipDetails: "",
        registerOffice: "",
        branchOffice: "",
        auctionProperty: [],
        contactOfficialData: [],
        lotsImages: []
      });
    }
    dispatch(getAllDetailOfcatalogue(id));
    if (navigate) navigate(-1);
    toast.update(toastID, {
      render: "File uploaded successfully",
      isLoading: false,
      autoClose: 5000,
      type: "success",
    });
  } catch (error) {
    toast.update(toastID, {
      render: "Failed to upload",
      isLoading: false,
      autoClose: 5000,
      type: "error",
    });
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "CANNOT_CATALOGUE_UPLOAD" });
  }
};

export const addCataLogueData = (id, catalogueData) => async (dispatch) => {
  dispatch({ type: "ADD_CATALOGUE_DATA_LOADING" });
  try {
    const { data } = await auction.post(
      `/auction/create/add-catalogue-data/${id}`, catalogueData
    );
    dispatch({ type: "ADD_CATALOGUE_DATA_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "ADD_CATALOGUE_DATA_FAILED" });
  }
};
export const catalogueReadEditData = (id) => async (dispatch) => {
  dispatch({ type: "READ_CATALOGUE_DATA_LOADING" });
  try {
    const { data } = await auction.get(
      `/catalogue/read/catalogue-data/${id}`,
    );
    dispatch({ type: "READ_CATALOGUE_DATA_SUCCESS", payload: data });
  } catch (error) {
    notifyError(error.response ? error.response?.data : error.message, error.response?.status);
    dispatch({ type: "READ_CATALOGUE_DATA_FAILED" });
  }
};