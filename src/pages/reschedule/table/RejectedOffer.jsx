import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleAuction } from "../../../redux/action/auction";
import { useMediaQuery } from "react-responsive";
import TableLoader from "../../commanPage/loader/TableLoader";
import {
  convertTo12HourFormat,
  NoItemsLeftInTable,
  roundToThreeDecimal,
} from "../../../helper/helpers";
import { Pagination } from "react-materialize";

function RejectedOffer({ setOffers }) {
  const totalNumberRow = 20;
  const dispatch = useDispatch();
  const { id } = useParams();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { singleAuctionData, singleAuctionLoading } = useSelector(
    (state) => state.singleAuction
  );
  const [rejectedOffers, setRejectedOffers] = useState([]);

  const handleSelectAll = () => {
    if (selectedOffers.length === rejectedOffers?.length) {
      setSelectedOffers([]);
      setOffers([]);
    } else {
      const allOfferIds = rejectedOffers?.map((item) => item._id);
      setSelectedOffers(allOfferIds);
      setOffers(allOfferIds);
    }
  };

  const handleSelectOffer = (offerId) => {
    if (selectedOffers.includes(offerId)) {
      setSelectedOffers((prev) => prev.filter((id) => id !== offerId));
      setOffers((prev) => prev.filter((id) => id !== offerId));
    } else {
      setSelectedOffers((prev) => [...prev, offerId]);
      setOffers((prev) => [...prev, offerId]);
    }
  };

  useEffect(() => {
    dispatch(getSingleAuction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleAuctionData?.offers && singleAuctionData?.auctionReport?.rejectedOffers) {
      const rejectList = singleAuctionData.offers.filter((item) =>
        singleAuctionData.auctionReport.rejectedOffers.some(
          (rejectedOffer) => rejectedOffer.offer === item._id
        )
      );
      setRejectedOffers(rejectList);
    }
  }, [singleAuctionData]);

  return (
    <div className="flex column full-width mt-1">
      {singleAuctionLoading ? (
        <div className="valign-wrapper justify-center cover white">
          <TableLoader
            headerData={[
              "Lots No.",
              "Product Type",
              "Quantity / UOM",
              "EMD Amount (Rs.)",
              "Time",
              "H1-Amount",
            ]}
          />
        </div>
      ) : (
        <>
          <div
            className={`${!isTablet && "table-container-style"
              } mb-1 full-width`}
          >
            <table
              className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
                } `}
            >
              <thead>
                <tr>
                  <th>
                    <span
                      className="material-symbols-outlined pointer"
                      onClick={handleSelectAll}
                      style={{ cursor: "pointer" }}
                    >
                      {selectedOffers.length ===
                        rejectedOffers?.length
                        ? "check_box"
                        : "check_box_outline_blank"}
                    </span>
                  </th>
                  <th>Lots No.</th>
                  <th>Product Type</th>
                  <th>Quantity / UOM</th>
                  <th>EMD Amount (Rs.)</th>
                  <th>Time</th>
                  <th>Starting price (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {rejectedOffers
                  ?.slice(currentPage, currentPage + totalNumberRow)
                  ?.map(
                    (items) =>
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
                        <td>{items?.offerNumber}</td>
                        <td style={{ width: !isTablet && "200px" }}>
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
                        <td>{`${convertTo12HourFormat(
                          items?.offerSchedule?.startTimeAndDate
                        )} - ${convertTo12HourFormat(
                          items?.offerSchedule?.endTimeAndDate
                        )}`}</td>
                        <td>
                          {roundToThreeDecimal(items?.bids[0]?.bidAmount) ||
                            "N/A"}
                        </td>
                      </tr>
                  )}
              </tbody>
            </table>
            {rejectedOffers?.length === 0 && <NoItemsLeftInTable />}
          </div>

          {rejectedOffers?.length > 20 && (
            <Pagination
              Data={rejectedOffers}
              totalNumberRow={totalNumberRow}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default RejectedOffer;
