import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Paginations from "../../commanPage/paginationUi/Paginations";
import {
  auctionTypeStyle,
  convertTo12HourFormat,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../helper/helpers";
import useFilteredEvents from "../../../helper/filterEvent";
import { getCompleteAuction } from "../../../redux/action/auctionStatus";
import { useDispatch, useSelector } from "react-redux";
import CommanLoader from "../../commanPage/loader/CommanLoader";

function CompleteAuctionTable({ searchTraderList, auctionFilter }) {
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const navigate = useNavigate();
  const totalNumberRow = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageVisited, setMaxPageVisited] = useState(1);
  const [completeAuctionList, setCompleteAuctionList] = useState([]);
  const [initialcompleted, setInitialcompleted] = useState([]);
  const { completedAuctionCollection, loading } = useSelector(
    (state) => state.auctionStatus
  );
  const filteredEvents = useFilteredEvents(initialcompleted, searchTraderList);

  useEffect(() => {
    dispatch(getCompleteAuction(currentPage, totalNumberRow, auctionFilter));
  }, [dispatch, auctionFilter, currentPage]);

  useEffect(() => {
    setCompleteAuctionList(completedAuctionCollection);
    setInitialcompleted(completedAuctionCollection);
  }, [completedAuctionCollection]);

  useEffect(() => {
    setMaxPageVisited(1);
    setCurrentPage(1);
  }, [auctionFilter]);

  const memoizedCompleteAuction = useMemo(
    () => completeAuctionList,
    [completeAuctionList]
  );

  useEffect(() => {
    setCompleteAuctionList(filteredEvents);
  }, [filteredEvents]);

  if (loading) {
    return <CommanLoader />;
  }

  return (
    <>
      <div className={`${!isTablet && "table-container-style"}`}>
        {memoizedCompleteAuction?.length <= 0 && searchTraderList !== "" ? (
          <NoItemsLeftInTable />
        ) : (
          <table
            className={`responsive-table centered ${
              isTablet ? "auction_table table-style" : "custom-table-style"
            }`}
          >
            <thead className="grey lighten-3">
              <tr>
                <th>Auction ID</th>
                <th>Auction Region</th>
                <th>Description</th>
                <th>Auction Type</th>
                <th>Date/Timings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {memoizedCompleteAuction?.map((items) => (
                <TableRow
                  key={items?.auctionId}
                  item={items}
                  isTablet={isTablet}
                  navigate={navigate}
                />
              ))}
            </tbody>
          </table>
        )}
        {memoizedCompleteAuction?.length === 0 && searchTraderList === "" && (
          <NoItemsLeftInTable />
        )}
      </div>

      {memoizedCompleteAuction?.length !== 0 && (
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalNumberRow={totalNumberRow}
          totalData={memoizedCompleteAuction?.length}
          maxPageVisited={maxPageVisited}
          setMaxPageVisited={setMaxPageVisited}
        />
      )}
    </>
  );
}

const TableRow = ({ item, isTablet, navigate }) => (
  <tr>
    <td>
      {item?.auctionId}
      {item?.location?.state && ` -${item?.location?.state}`}
    </td>
    <td>{item?.auctionRegion || "..."}</td>
    <td style={{ width: !isTablet ? "400px" : "auto" }}>
      <span className="NoOfline" style={{ WebkitLineClamp: 1 }}>
        {item?.description || "..."}
      </span>
    </td>
    <td>
      <span
        className={`${
          item?.auctionType === "reverseAuctionService"
            ? "auctiontype-reverseService"
            : item?.auctionType === "reverseAuctionProduct"
            ? "reverseAuctionProduct"
            : "auctiontype-forward"
        }`}
      >
        {auctionTypeStyle(item?.auctionType)}{" "}
      </span>
    </td>
    <td>
      <p>
        {handleDateSetUp(item?.auctionSchedule?.startDate)},{" "}
        {convertTo12HourFormat(item?.auctionSchedule?.startingTime)} to{" "}
        {convertTo12HourFormat(item?.auctionSchedule?.endingTime)}
      </p>
    </td>
    <td>
      <span
        className="material-icons-outlined cercle-purple-text pointer"
        onClick={() => {
          if (item?.auctionType === "reverseAuctionProduct") {
            navigate(
              `/completed/reverse-product-auction/auction-details/${item?._id}`
            );
          } else if (item?.auctionType === "reverseAuctionService") {
            navigate(`/completed/reverse-service-auction/auction-details/${item?._id}`);
          } else {
            navigate(`/completed/forward-auction/auction-details/${item?._id}`);
          }
        }}
      >
        visibility
      </span>
    </td>
  </tr>
);

export default CompleteAuctionTable;
