export const adminReducer = (
  state = { adminLoading: false, adminList: [] },
  { type, payload }
) => {
  switch (type) {
    case "GET_ALL_ADMIN_LIST_LOADING":
      return { ...state, adminLoading: true };
    case "GET_ALL_ADMIN_LIST_SUCCESS":
      return { ...state, adminList: payload, adminLoading: false };
    case "GET_ALL_ADMIN_LIST_FAILED":
      return { ...state, adminLoading: false, adminList: [] };
    case "BLOCK_ADMIN_ACCOUNT_LOADING":
      return { ...state, adminLoading: true };
    case "BLOCK_ADMIN_ACCOUNT_SUCCESS":
      return { ...state, adminLoading: false };
    case "BLOCK_ADMIN_ACCOUNT_FAILED":
      return { ...state, adminLoading: false };
    case "UNBLOCK_ADMIN_ACCOUNT_LOADING":
      return { ...state, adminLoading: true };
    case "UNBLOCK_ADMIN_ACCOUNT_SUCCESS":
      return { ...state, adminLoading: false };
    case "UNBLOCK_ADMIN_ACCOUNT_FAILED":
      return { ...state, adminLoading: false };
    default:
      return state;
  }
};
