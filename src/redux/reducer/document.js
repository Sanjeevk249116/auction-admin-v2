const initailState = {
  documentData: [],
  loading: false,
  downloadFileLoading: false,
  viewDocumentLoading: false,
  viewDocument: null,
  fileType: null,
};

export function allDocumentsReducer(state = initailState, { type, payload,fileType }) {
  switch (type) {
    case "GET_ALL_DOCUMENT":
      return { ...state, documentData: payload, loading: false };
    case "SHOW_DOCUMENT_LOADING":
      return { ...state, loading: true };
    case "SHOW_DOCUMENT_LOADDED":
      return { ...state, loading: false };
    case "DOCUMENT_UPLOAD":
      return { ...state };

    case "DOWNLOAD_FILE_SUCCESS":
      return { ...state, downloadFileLoading: false };
    case "DOWNLOADING_FILE":
      return { ...state, downloadFileLoading: true };

    case "FAILED_DOWNLOAD_FILE":
      return { ...state, downloadFileLoading: false };
    case "SHOW_REJECT":
      return { ...state, loading: true };
    case "CANNOT_REJECT":
      return { ...state, loading: false };
    case "SHOW_CONFIRM":
      return { ...state, loading: true };
    case "CANNOT_CONFIRM":
      return { ...state, loading: false };
    case "VIEW_DOCUMENT_LOADING":
      return { ...state, viewDocumentLoading: true };
    case "VIEW_DOCUMENT_SUCCESS":
      return { ...state, viewDocumentLoading: false, viewDocument: payload, fileType: fileType };
    case "VIEW_DOCUMENT_FAILED":
      return { ...state, viewDocumentLoading: false };
    default:
      return state;
  }
}
