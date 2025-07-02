const initailState = {
  cordinatorData: [],
  cordinatorLoading: false,
  singleCoordinatorDetails: {},
};

export function cordinatorReducer(state = initailState, { type, payload }) {
  switch (type) {
    case "CORDINATOR_SUCCESS":
      return { ...state, cordinatorData: payload, cordinatorLoading: false };
    case "SHOW_LOADING_CORDINATOR":
      return { ...state, cordinatorLoading: true };
    case "CANNOT_CORDINATOR":
      return { ...state, cordinatorLoading: false };
    case "SHOW_LOADING_CORDINATORS":
      return { ...state, cordinatorLoading: true };
    case "CORDINATOR_ADD_SUCCESS":
      return { ...state, cordinatorLoading: false };
    case "CANNOT_ADD_CORDINATOR":
      return { ...state, cordinatorLoading: false };
      case "LOADING_EDIT_CORDINATOR":
        return { ...state, cordinatorLoading: true };
      case "EDIT_CORDINATOR_SUCCESS":
        return { ...state, cordinatorLoading: false };
      case "CANNOT_EDIT_CORDINATOR":
        return { ...state, cordinatorLoading: false };
        case "SHOW_SINGLE_LOADING_CORDINATOR":
          return { ...state, cordinatorLoading: true };
        case "CANNOT_SINGLE_CORDINATOR":
          return { ...state, cordinatorLoading: false };
          case "SINGLE_CORDINATOR_SUCCESS":
      return { ...state, singleCoordinatorDetails: payload, cordinatorLoading: false };

    default:
      return state;
  }
}
