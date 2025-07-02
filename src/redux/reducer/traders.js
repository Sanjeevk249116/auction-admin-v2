export const tradersListReducer = (
  state = { tradersList: [], tradersListLoading: false, traderInviteLoaiding: false },
  { type, payload }
) => {
  switch (type) {
    case "TRADERS_LIST_FETCHING":
      return { ...state, tradersListLoading: true };
    case "TRADERS_LIST_SUCCESS":
      return { ...state, tradersList: payload, tradersListLoading: false };
    case "CANNOT_FETCH_TRADERSLIST":
      return { ...state, tradersListLoading: false };
    case "INVITE_NEW_TRADER_LOADING":
      return { ...state, traderInviteLoaiding: true };
    case "INVITE_NEW_TRADER_SUCCESS":
      return { ...state, traderInviteLoaiding: false };
    case "INVITE_NEW_TRADER_FAILED":
      return { ...state, traderInviteLoaiding: false };

    default:
      return state;
  }
};
