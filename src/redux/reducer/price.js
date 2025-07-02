export const startingPriceApprovalReducer = (
    state = {  priceLoading: false, approvelLoading:false },
    { type, payload }
) => {
    switch (type) {
        case "STARTING_PRICE_LOADING":
            return { ...state, priceLoading: true };
        case "STARTING_PRICE_SUCCESS":
            return { ...state,  priceLoading: false };
        case "STARTING_PRICE_FAILED":
            return { ...state, priceLoading: false,  };
            case "STARTING_PRICE_APPROVED_LOADING":
            return { ...state, approvelLoading: true };
        case "STARTING_PRICE_APPROVED_SUCCESS":
            return { ...state,  approvelLoading: false };
        case "STARTING_PRICE_APPROVED_FAILED":
            return { ...state, approvelLoading: false,  };

        default:
            return state;
    }
};