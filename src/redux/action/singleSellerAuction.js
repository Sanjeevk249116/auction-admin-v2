import { notifyError } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const singleSellerAuction =
  (id, status, currentPage, totalNumberRow, auctionFilter) =>
  async (dispatch) => {
    const skip = (currentPage - 1) * totalNumberRow;
    dispatch({ type: "SINGLE_SELLER_FETCHING" });
    try {
      const { data } = await auction.get(
        `/auction/read/admin/single-seller-auctions/${id}?${
          status && "filter=" + status
        }&auctionType=${auctionFilter}&skip=${skip}&limit=${totalNumberRow}`
      );
      dispatch({ type: "SINGLE_SINGLE_SUCCESS", payload: data });
    } catch (error) {
      notifyError(error.response ? error.response?.data : error.message,error.response?.status);
      dispatch({ type: "CANNOT_FETCH_SINGLE_SELLER" });
    }
  };
