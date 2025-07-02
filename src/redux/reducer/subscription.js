export const subscriptionReducer = (
  state = {
    subscriptionCollection: [],
    archiveSubscription: [],
    singleSubscriptionDetails: {},
    subscriptionLoading: false,
    adminPaidSubscriptionLoading: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "SUBSCRIPTION_FETCHING":
      return { ...state, subscriptionLoading: true };
    case "SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        subscriptionCollection: payload,
        subscriptionLoading: false,
      };
    case "CANNOT_FETCH_SUBSCRIPTION":
      return { ...state, subscriptionLoading: false };
    case "ARCHIVE_SUBSCRIPTION_FETCHING":
      return { ...state, subscriptionLoading: true };
    case "ARCHIVE_SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        archiveSubscription: payload,
        subscriptionLoading: false,
      };
    case "CANNOT_FETCH_ARCHIVE_SUBSCRIPTION":
      return { ...state, subscriptionLoading: false };
    case "ARCHIVE_PLAN_SUBSCRIPTION_SUCCESS":
      return { ...state, subscriptionLoading: false };
    case "SINGLE_SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        singleSubscriptionDetails: payload,
        subscriptionLoading: false,
      };
    case "CANNOT_FETCH_SINGLE_SUBSCRIPTION":
      return { ...state, subscriptionLoading: false };
    case "SINGLE_SUBSCRIPTION_FETCHING":
      return { ...state, subscriptionLoading: true };
    case "ADMIN_PAID_SUBSCRIPTION_LOADING":
      return { ...state, adminPaidSubscriptionLoading: true };
    case "ADMIN_PAID_SUBSCRIPTION_SUCCESS":
      return { ...state, adminPaidSubscriptionLoading: false };
    case "ADMIN_PAID_SUBSCRIPTION_FAILED":
      return { ...state, adminPaidSubscriptionLoading: false };

    default:
      return state;
  }
};
