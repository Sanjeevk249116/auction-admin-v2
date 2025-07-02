export const adminAnalyticReducer = (
    state = { analyticLoading: false, analyticData: {} },
    { type, payload }
) => {
    switch (type) {
        case "ADMIN_ANALYTICS_LOADING":
            return { ...state, analyticLoading: true };
        case "ADMIN_ANALYTICS_SUCCESS":
            return { ...state, analyticData: payload, analyticLoading: false };
        case "ADMIN_ANALYTICS_FAILED":
            return { ...state, analyticLoading: false, analyticData: {} };

        default:
            return state;
    }
};