import { notifyError } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getNotificationAuction = () => async (dispatch) => {
  dispatch({ type: "SHOW_NOTIFICATION_LOGGING" });
  try {
    await auction.get("/profile/read/notifications").then((res) => {
      dispatch({ type: "GET_NOTIFICATION", payload: res.data });
    });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "HIDE_NOTIFICATION_LOGGED" });
  }
};

export const updateReadNotification =
  (id, type, navigate, auctions, auctionType) => async (dispatch) => {
    dispatch({ type: "SHOW_READ_LODDING" });
    try {
      await auction
        .put(`/profile/update/read-notification/${id}`)
        .then((res) => {
          dispatch({ type: "READ_NOTIFICATION", payload: res.data });
          dispatch(getNotificationAuction());
          if (type === "new-auction" || type === "paid-emd") {
            if (auctionType === "reverseAuctionService") {
              navigate(
                `/reverse-service-auction/auction-details/${auctions}`
              );
            } else if (auctionType === "reverseAuctionProduct") {
              navigate(
                `/reverse-product-auction/auction-details/${auctions}`
              );
            } else {
              navigate(`/forward-auction/auction-details/${auctions}`);
            }
          } else if (type === "document-upload") {
            navigate(`/trader-collection`);
          } else {
            // Add a default navigation or handle other types if necessary when click on read and update to readed notification
          }
        });
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "HIDE_READ_LODDED" });
    }
  };
