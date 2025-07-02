export const saleIntimationReducer = (state = {
    saleIntimationLoading: false,
    saleIntimationPdfUrl: null,
    downloadPdf: null,
    PdfLoading: false,
}, { type, payload }) => {
    switch (type) {
        case "GET_SALE_INTIMATION_LOADING": return { ...state, saleIntimationLoading: true };
        case "GET_SALE_INTIMATION_SUCCESS": return { ...state, saleIntimationLoading: false };
        case "GET_SALE_INTIMATION_FAILED": return { ...state, saleIntimationLoading: false };
        case "SHOW_SALE_LOADING_VIEW": return { ...state, saleIntimationLoading: true };
        case "GET_VIEW_SALE_DATA": return { ...state, saleIntimationLoading: false, saleIntimationPdfUrl: payload };
        case "HIDE_LOADING_SALE_VIEW": return { ...state, saleIntimationLoading: false, saleIntimationPdfUrl: null };
        default:
            return state;
    }
}