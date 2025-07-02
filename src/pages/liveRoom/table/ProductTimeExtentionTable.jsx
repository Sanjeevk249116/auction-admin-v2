import React from "react";
import { useMediaQuery } from "react-responsive";
import TableLoader from "../../commanPage/loader/TableLoader";
import { NoItemsLeftInTable } from "../../../helper/helpers";

function ProductTimeExtentionTable({
  offers,
  singleAuctionLoading,
  selectedOffers,
  setSelectedOffers,
}) {
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

  // Handle select/deselect all offers
  const handleSelectAll = () => {
    if (selectedOffers.length === offers?.length) {
      setSelectedOffers([]);
    } else {
      const allOfferIds = offers.map((item) => item._id);
      setSelectedOffers(allOfferIds);
    }
  };

  // Handle select/deselect individual offer
  const handleSelectOffer = (offerId) => {
    if (selectedOffers.includes(offerId)) {
      setSelectedOffers((prev) => prev.filter((id) => id !== offerId));
    } else {
      setSelectedOffers((prev) => [...prev, offerId]);
    }
  };

  if (singleAuctionLoading) {
    return (
      <TableLoader
        headerData={[
          "Lots Id",
          "Product Type",
          "Quantity / UOM",
          "Min Increment(Rs.)",
          "Action",
        ]}
      />
    );
  }
  return (
    <div className={`${!isTablet && "table-container-style"} mb-1 full-width`}>
      <table
        className={`responsive-table centered ${
          isTablet ? "auction_table table-style" : "custom-table-style"
        } `}
      >
        <thead>
          <tr>
            <th>
              {" "}
              <span
                className="material-symbols-outlined pointer"
                onClick={handleSelectAll}
                style={{ cursor: "pointer" }}
              >
                {selectedOffers.length === offers?.length
                  ? "check_box"
                  : "check_box_outline_blank"}
              </span>
            </th>

            <th>Lots No.</th>
            <th>Product Type</th>
            <th>Quantity / UOM</th>
            <th>Max Decrement(Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {offers?.map((items) => (
            <tr key={items?._id}>
              <td style={{ width: "100px" }}>
                <span
                  className="material-symbols-outlined pointer"
                  onClick={() => handleSelectOffer(items._id)}
                  style={{ cursor: "pointer" }}
                >
                  {selectedOffers.includes(items._id)
                    ? "check_box"
                    : "check_box_outline_blank"}
                </span>
              </td>

              <td>{items?.fullOfferDetails?.offerNumber}</td>
              <td style={{ width: !isTablet && "230px" }}>
                <span className="NoOfline" style={{ WebkitLineClamp: 1 }}>
                  {items?.fullOfferDetails?.productDetails?.type}
                </span>
              </td>
              <td>
                {" "}
                {items?.fullOfferDetails?.productDetails?.quantity}/
                {items?.fullOfferDetails?.productDetails?.unit}
              </td>
              <td>{items?.fullOfferDetails?.maximumBid}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {offers?.length === 0 && <NoItemsLeftInTable />}
    </div>
  );
}

export default ProductTimeExtentionTable;
