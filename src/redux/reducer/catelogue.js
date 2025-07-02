const initailState = {
  catelogue: [],
  allCatalogueDetails: [],
  CatelogueLoading: false,
  catalogueEditData: [],
  readCatalogueLoading: false,
};

export function catelogueReducers(state = initailState, { type, payload }) {
  switch (type) {
    case "GET_CATELOG_DATA":
      return { ...state, catelogue: payload, CatelogueLoading: false };
    case "GET_ALL_SELLER_CATELOGUE":
      return { ...state, allCatalogueDetails: payload, CatelogueLoading: false };
    case "SHOW_LOADING_CATELOG":
      return { ...state, CatelogueLoading: true };
    case "HIDE_LOADING_CATELOG":
      return { ...state, CatelogueLoading: false };
    case "APPROVE_CATELOGUE":
      return { ...state, CatelogueLoading: false };
    case "APPROVE_NOT_CATELOGUE":
      return { ...state, CatelogueLoading: false };
    case "READ_CATALOGUE_DATA_SUCCESS":
      return {
        ...state,
        catalogueEditData: payload,
        readCatalogueLoading: false,
      };
    case "READ_CATALOGUE_DATA_LOADING":
      return { ...state, readCatalogueLoading: true };
    case "READ_CATALOGUE_DATA_FAILED":
      return { ...state, readCatalogueLoading: false };
    default:
      return state;
  }
}

export const getCatelogueViewPdfReducer = (
  state = {
    catelogueViewPdfLoading: false,
    CateloguePdfUrl: null,
    downloadPdf: null,
    PdfLoading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "SHOW_LOADING_VIEW":
      return { ...state, catelogueViewPdfLoading: true };
    case "GET_VIEW_CATELOG_DATA":
      return {
        ...state,
        CateloguePdfUrl: payload,
        catelogueViewPdfLoading: false,
      };
    case "HIDE_LOADING_CATELOG_VIEW":
      return {
        ...state,
        catelogueViewPdfLoading: false,
        CateloguePdfUrl: null,
      };
    case "SHOW_LOADING_DOWNLOAD":
      return { ...state, PdfLoading: true };
    case "GET_DOWNLOAD_CATELOG_DATA":
      return { ...state, PdfLoading: false };
    case "HIDE_LOADING_CATELOG_DOWNLOAD":
      return { ...state, PdfLoading: false };
    default:
      return state;
  }
};

export const catelogueInformationReducer = (
  state = {
    catelogueDetails: {},
    catalogueInfoLoading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "SHOW_CATALOGUE_INFO":
      return { ...state, catalogueInfoLoading: true };
    case "SUCCESS_CATALOGUE_INFO":
      return {
        ...state,
        catelogueDetails: payload,
        catalogueInfoLoading: false,
      };
    case "CANNOT_CATALOGUE_INFO":
      return { ...state, catalogueInfoLoading: false };

    default:
      return state;
  }
};
