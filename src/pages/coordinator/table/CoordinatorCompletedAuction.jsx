import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  auctionTypeStyle,
  convertTo12HourFormat,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../helper/helpers";
import { useNavigate } from "react-router-dom";

function CoordinatorCompletedAuction({ singleCoordinatorDetails }) {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

  const [completedAuctionList, setCompletedAuctionList] = useState([]);

  useEffect(() => {
    const completedAuctionFilter = singleCoordinatorDetails?.auctions?.filter(
      (item) => {
        return item?.status === "completed";
      }
    );
    setCompletedAuctionList(completedAuctionFilter);
  }, [singleCoordinatorDetails]);

  return (
    <div className="table-container-style mt-1">
      <table
        className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
          } `}
      >
        <thead>
          <tr>
            <th>Auction ID</th>
            <th>Auction Region</th>
            <th>Auction Type</th>
            <th>Description</th>
            <th>Date/Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {completedAuctionList?.map((items, index) => (
            <tr key={items?._id}>
              <td>{items?.auctionId}</td>
              <td>{items?.auctionRegion || "..."}</td>
              <td>
                <span
                  className={`${items?.auctionType === "reverseAuctionService"
                      ? "auctiontype-reverseService"
                      : items?.auctionType === "reverseAuctionProduct"
                        ? "reverseAuctionProduct"
                        : "auctiontype-forward"
                    }`}
                >
                  {auctionTypeStyle(items?.auctionType)}{" "}
                </span>
              </td>
              <td style={{ width: !isTablet && "250px" }}>
                <p className="NoOfline" style={{ WebkitLineClamp: 1 }}>
                  {items?.description}
                </p>
              </td>
              <td>
                <p>
                  {handleDateSetUp(items?.auctionSchedule?.startDate)}
                  {" , "}
                  {convertTo12HourFormat(
                    items?.auctionSchedule?.startingTime
                  )}{" "}
                  to {convertTo12HourFormat(items?.auctionSchedule?.endingTime)}
                </p>
              </td>
              <td>
                <span
                  className="material-icons-outlined cercle-purple-text pointer"
                  onClick={() => {
                    if (items?.auctionType === "reverseAuctionProduct") {
                      navigate(
                        `/completed/reverse-product-auction/auction-details/${items?._id}`
                      );
                    } else if (
                      items?.auctionType === "reverseAuctionService"
                    ) {
                      navigate(
                        `/completed/reverse-service-auction/auction-details/${items?._id}`
                      );
                    } else {
                      navigate(
                        `/completed/forward-auction/auction-details/${items?._id}`
                      );
                    }
                  }}
                >
                  visibility
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {completedAuctionList?.length === 0 && <NoItemsLeftInTable />}
    </div>
  );
}

export default CoordinatorCompletedAuction;
