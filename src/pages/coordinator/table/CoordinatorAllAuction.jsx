import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  auctionTypeStyle,
  capitalizeFirstLetter,
  convertTo12HourFormat,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../helper/helpers";
import { useNavigate } from "react-router-dom";

function CoordinatorAllAuction({ singleCoordinatorDetails }) {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [allAuctionList, setAllAuctionList] = useState([
    singleCoordinatorDetails?.auctions,
  ]);

  useEffect(() => {
    setAllAuctionList(singleCoordinatorDetails?.auctions);
  }, [singleCoordinatorDetails]);

  return (
    <div className="table-container-style mt-1">
      <table
        className={`responsive-table centered ${
          isTablet ? "auction_table table-style" : "custom-table-style"
        } `}
      >
        <thead>
          <tr>
            <th>Auction ID</th>
            <th>Auction Region</th>
            <th>Auction Type</th>
            <th>Description</th>
            <th>Date/Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allAuctionList?.reverse()?.map((items, index) => (
            <tr key={items?._id}>
              <td>{items?.auctionId}</td>
              <td>{items?.auctionRegion || "..."}</td>
              <td>
                <span
                  className={`${
                    items?.auctionType === "reverseAuctionService"
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
                  style={{
                    color:
                      items?.status === "ongoing"
                        ? "purple"
                        : items?.status === "completed"
                        ? "green"
                        : "orange",
                  }}
                >
                  {capitalizeFirstLetter(items?.status)}
                </span>
              </td>
              <td>
                <span
                  className="material-icons-outlined cercle-purple-text pointer"
                  onClick={() => {
                    if (items?.status === "completed") {
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
                    } else {
                      if (items?.auctionType === "reverseAuctionProduct") {
                        navigate(
                          `/reverse-product-auction/auction-details/${items?._id}`
                        );
                      } else if (
                        items?.auctionType === "reverseAuctionService"
                      ) {
                        navigate(
                          `/reverse-service-auction/auction-details/${items?._id}`
                        );
                      } else {
                        navigate(
                          `/forward-auction/auction-details/${items?._id}`
                        );
                      }
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
      {allAuctionList?.length === 0 && <NoItemsLeftInTable />}
    </div>
  );
}

export default CoordinatorAllAuction;
