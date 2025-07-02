const initialState = {
  reportLoading: false,
  generateReportLoading: false,
}
export const auctionReportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "AUCTION_REPORT_LOADING":
      return { ...state, reportLoading: true };
    case "AUCTION_REPORT_SUCCESS":
      return { ...state, reportLoading: false };
    case "AUCTION_REPORT_FAILED":
      return { ...state, reportLoading: false };
    case "GENERATE_AUCTION_REPORT_LOADING":
      return { ...state, generateReportLoading: true };
    case "GENERATE_AUCTION_REPORT_SUCCESS":
      return { ...state, generateReportLoading: false };
    case "GENERATE_AUCTION_REPORT_FAILED":
      return { ...state, generateReportLoading: false };

    default:
      return state;
  }
}

export const getAuctionReportViewPdfReducer = (
  state = {
    reportViewPdfLoading: false,
    reportPdfUrl: null,
    downloadPdf: null,
    PdfLoading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "GET_AUCTION_REPORT_LOADING":
      return { ...state, reportViewPdfLoading: true };
    case "GET_AUCTION_REPORT_SUCCESS":
      return {
        ...state,
        reportPdfUrl: payload,
        reportViewPdfLoading: false,
      };
    case "GET_AUCTION_REPORT_FAILED":
      return { ...state, reportViewPdfLoading: false, reportPdfUrl: null };
    case "SHOW_LOADING_DOWNLOAD":
      return { ...state, PdfLoading: true };
    case "GET_DOWNLOAD_REPORT_DATA":
      return { ...state, PdfLoading: false };
    case "HIDE_LOADING_REPORT_DOWNLOAD":
      return { ...state, PdfLoading: false };
    default:
      return state;
  }
};

