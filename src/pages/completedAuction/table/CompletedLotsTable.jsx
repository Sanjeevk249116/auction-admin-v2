import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-materialize";
import TableLoader from "../../commanPage/loader/TableLoader";
import {
  NoItemsLeftInTable,
  roundToThreeDecimal,
} from "../../../helper/helpers";

function CompletedLotsTable({
  offers,
  loading,
  setAcceptedOffers,
  setRejectedOffers,
  removeOSelectedOffers,
  lotApproved = false,
  startingPriceApproval,
}) {
  const totalNumberRow = 50;
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const navigate = useNavigate();

  const acceptedOffers = lotApproved?.acceptedOffers || [];
  const rejectedOffers = lotApproved?.rejectedOffers || [];

  // Handle select/deselect all offers
  const handleSelectAll = () => {
    if (selectedOffers.length === offers?.length) {
      setSelectedOffers([]);
      setAcceptedOffers([]);
      setRejectedOffers(offers.map((item) => item._id)); // Set all as rejected
    } else {
      const allOfferIds = offers.map((item) => item._id);
      setSelectedOffers(allOfferIds);
      setAcceptedOffers(allOfferIds);
      setRejectedOffers([]);
    }
  };

  // Handle select/deselect individual offer
  const handleSelectOffer = (offerId) => {
    if (selectedOffers.includes(offerId)) {
      setSelectedOffers((prev) => prev.filter((id) => id !== offerId));
      setAcceptedOffers((prev) => prev.filter((id) => id !== offerId)); // Remove from accepted offers
      setRejectedOffers((prev) => [...prev, offerId]); // Add to rejected offers
    } else {
      setSelectedOffers((prev) => [...prev, offerId]);
      setAcceptedOffers((prev) => [...prev, offerId]); // Add to accepted offers
      setRejectedOffers((prev) => prev.filter((id) => id !== offerId)); // Remove from rejected offers
    }
  };

  useEffect(() => {
    setSelectedOffers([]);
  }, [removeOSelectedOffers]);

  return (
    <div className="flex column full-width mt-1">
      {loading ? (
        <div className="valign-wrapper justify-center cover white">
          <TableLoader
            headerData={[
              "Lots Id",
              "Product Type",
              "Quantity / UOM",
              "EMD Amount (Rs.)",
              "Starting price (Rs.)",
              "Min Increment(Rs.)",
              "Action",
            ]}
          />
        </div>
      ) : (
        <>
          <div
            className={`${
              !isTablet && "table-container-style"
            } mb-1 full-width`}
          >
            <table
              className={`responsive-table centered ${
                isTablet ? "auction_table table-style" : "custom-table-style"
              } `}
            >
              <thead>
                <tr>
                  {!lotApproved && (
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
                  )}
                  <th>Lots No.</th>
                  <th>Product Type</th>
                  <th>Quantity / UOM</th>
                  <th>EMD Amount (Rs.)</th>
                  <th>Starting price (Rs.)</th>
                  <th>H1-Amount</th>
                  {lotApproved && <th>Sale Intimation</th>}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {offers
                  ?.slice(currentPage, currentPage + totalNumberRow)
                  ?.map((items) => {
                    const isAccepted = acceptedOffers.some(
                      (offer) => offer.offer === items._id
                    );
                    const isRejected = rejectedOffers.some(
                      (offer) => offer.offer === items._id
                    );
                    const rowStyle = {
                      backgroundColor: isAccepted
                        ? "rgb(235 255 229)"
                        : isRejected
                        ? "rgb(255 236 235)"
                        : "transparent",
                    };

                    return (
                      <tr key={items?._id} style={rowStyle}>
                        {!lotApproved && (
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
                        )}
                        <td>{items?.offerNumber}</td>
                        <td style={{ width: !isTablet && "220px" }}>
                          <span
                            className="NoOfline"
                            style={{ WebkitLineClamp: 1 }}
                          >
                            {items?.scrapDetails?.type}
                          </span>
                        </td>
                        <td>
                          {" "}
                          {items?.scrapDetails?.quantity}/
                          {items?.scrapDetails?.unit}
                        </td>
                        <td>{items?.EMDAmount}</td>
                        <td>
                          {startingPriceApproval ? items?.startingPrice : "N/A"}
                        </td>
                        <td>
                          {roundToThreeDecimal(items?.highestBid) || "N/A"}
                        </td>
                        {lotApproved &&
                          (items?.saleIntimation?.trader ? (
                            <td
                              className="cercle-purple-text text-decoration-underLine pointer"
                              onClick={() =>
                                navigate(
                                  `/view/sale-intimation/${items?.saleIntimation?.fileId}`
                                )
                              }
                            >
                              View
                            </td>
                          ) : (
                            <td>...</td>
                          ))}
                        <td>
                          <button
                            className="cercle-purple-text text-decoration-underLine pointer"
                            onClick={() =>
                              navigate(
                                `/offerBids/${items.auction}/${items._id}`
                              )
                            }
                          >
                            View bids
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {offers?.length === 0 && <NoItemsLeftInTable />}
          </div>

          {offers?.length > 20 && (
            <Pagination
              Data={offers}
              totalNumberRow={totalNumberRow}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CompletedLotsTable;
