const initailState = {
    notificationArray: [],
    loadings: false,
  };
  
  export function notificationReducer(state = initailState, { type, payload }) {
    switch (type) {
      case "GET_NOTIFICATION":
        return { ...state, notificationArray: payload, loadings: false };
      case "SHOW_NOTIFICATION_LOGGING":
        return { ...state, loadings: true };
      case "HIDE_NOTIFICATION_LOGGED":
        return { ...state, loadings: false };
        case "HIDE_READ_LODDED":
        return { ...state, loadings: false };
      case "READ_NOTIFICATION":
        return { ...state, loadings: false };
        case "SHOW_READ_LODDING":
          return { ...state, loadings: true };
      default:
        return state;
    }
  }