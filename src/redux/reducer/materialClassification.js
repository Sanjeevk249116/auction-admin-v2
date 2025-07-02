const initailState = {
    materialClassificationData: [],
    loadingmaterial: false,
  };
  
  export function materialClassificationReducer(state = initailState, { type, payload }) {
    switch (type) {
      case "MATERIAL_CLASSIFICATION_SUCCESS":
        return { ...state, materialClassificationData: payload, loadingmaterial: false };
      case "MATERIAL_CLASSIFICATION_LOADING":
        return { ...state, loadingmaterial: true };
      case "MATERIAL_CLASSIFICATION_FAILED":
        return { ...state, loadingmaterial: false };
        case "UPDATE_MATERIAL_CLASSIFICATION_LOADING":
            return { ...state, loadingmaterial: true };
          case "UPDATE_MATERIAL_CLASSIFICATION_SUCCESS":
            return { ...state, loadingmaterial: false };
            case "UPDATE_MATERIAL_CLASSIFICATION_FAILED":
                return { ...state, loadingmaterial: false };
      default:
        return state;
    }
  }