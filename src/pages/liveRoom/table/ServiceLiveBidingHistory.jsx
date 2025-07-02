import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { convertToIST12HourFormat, NoItemsLeftInTable, roundToThreeDecimal } from "../../../helper/helpers";
import { useState } from "react";

function ServiceLiveBidingHistory({ bidderDetails }) {
  const [descendingOrder, setDescendingOrder] = useState(false);
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [allAuctionBidDetails, setAllAuctionBidDetails] =
    useState(bidderDetails);

  const handlePriceFilter = () => {
    setDescendingOrder(!descendingOrder);
    if (!descendingOrder) {
      bidderDetails?.sort((a, b) => a.bidAmount - b.bidAmount);
    } else {
      bidderDetails?.sort((a, b) => b.bidAmount - a.bidAmount);
    }
    setAllAuctionBidDetails(bidderDetails);
  };

  useEffect(() => {
    setAllAuctionBidDetails(bidderDetails)
  }, [bidderDetails])

  return (
    <div className={`${!isTablet && "table-container-style"}`}>
      <table
        className={`responsive-table centered ${isTablet
          ? "auction_table table-style"
          : "custom-table-style liveAuction-table"
          } `}
      >
        <thead>
          <tr>
            <th className="pointer valign-wrapper mt-1 justify-center" onClick={handlePriceFilter}>
              Lowest Bids
              <span className="material-symbols-outlined cercle-purple-text font-20px">
                {!descendingOrder ? "arrow_upward" : "arrow_downward"}
              </span>
            </th>
            <th>Bidder Name</th>
            <th>Organization Name </th>
            <th>
              Bid type <br /> Manual/Auto Bid
            </th>

            <th>Last bid time</th>
            <th>Contact Details</th>

            {/* <th>Send a remainder </th> */}
          </tr>
        </thead>
        <tbody>
          {allAuctionBidDetails?.map((item, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#FBF1FF" : "#fdf8ff",
              }}
            >
              <td>{roundToThreeDecimal(item?.bidAmount)}</td>
              <td>{item?.organization?.owner?.name}</td>
              <td>{item?.organization?.organizationName}</td>
              <td>{item?.bidType}</td>
              <td>{convertToIST12HourFormat(item?.createdAt)}</td>
              <td>
                <p>{item?.organization?.owner?.phoneNumber || "N/A"}</p>
                <p>{item?.organization?.owner?.email || "N/A"}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(bidderDetails?.length === 0 || bidderDetails === undefined) && <NoItemsLeftInTable />}
    </div>
  );
}

export default ServiceLiveBidingHistory;
