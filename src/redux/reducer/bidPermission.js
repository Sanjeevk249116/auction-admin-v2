const initailState = {
    permissionBidder:[],
    permissionBidderLoading: false,
  };
  
  export function bidderPermissionReducer(state = initailState, { type, payload }) {
    switch (type) {
      case "BIDDER_PERMISSION_LOADING":
        return { ...state,  permissionBidderLoading: true };
      case "BIDDER_PERMISSION_SUCCESS":
        return { ...state, permissionBidder: payload, permissionBidderLoading: false };
      case "GIVE_BIDDER_PERMISSION_SUCCESS":
        return { ...state, permissionBidderLoading: false };
      case "BIDDER_PERMISSION_FAILED":
        return { ...state, permissionBidderLoading: false };
     
      default:
        return state;
    }
  }
 