const initialState = {
  loading: false,
};

export function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "LOGGING_IN":
      return { ...state, loading: true };
    case "CANNOT_LOGIN":
      return { ...state, loading: false };
    case "HIDE_LOADING":
      return { ...state, loading: false };
    case "LOGGING_OUT":
      return { ...state, loading: true };
    case "CANNOT_LOGOUT":
      return { ...state, loading: false };
      case "LOGOUT_SUCCESS":
        return { ...state, loading: false };

    default:
      return state;
  }
}


export const profileReducer = (
  state = {
    profileLoading: false,
    profile: {},
    adminData:{}
  },
  { type, payload }
) => {
  switch (type) {
    case "GET_USER_PROFILE":
      return { ...state, profileLoading: true };
    case "GET_USER_PROFILE_SUCCESS":
      return { ...state, profileLoading: false, profile: payload };
    case "GET_USER_PROFILE_FAILED":
      return { ...state, profileLoading: false };
    case "GET_ADMIN_DETAILS_LOADING":
      return { ...state, profileLoading: true };
    case "GET_ADMIN_DETAILS_SUCCESS":
      return { ...state, profileLoading: false, adminData: payload };
    case "GET_ADMIN_DETAILS_FAILED":
      return { ...state, profileLoading: false };
    default:
      return state;
  }
};
