import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleSellerAuction } from "../../../../redux/action/singleSellerAuction";
import CommanLoader from "../../../commanPage/loader/CommanLoader";
import useFilteredEvents from "../../../../helper/filterEvent";
import {
  auctionTypeStyle,
  convertTo12HourFormat,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../../helper/helpers";
import Paginations from "../../../commanPage/paginationUi/Paginations";

function CompleteAuctionTables({ searchData, auctionFilter }) {
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const navigate = useNavigate();
  const totalNumberRow = 30;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageVisited, setMaxPageVisited] = useState(1);
  const [completeAuctionList, setCompleteAuctionList] = useState([]);
  const [initialcompleted, setInitialcompleted] = useState([]);
  const { sellerAuctionCollection, loading } = useSelector(
    (state) => state.singleSellerAuction
  );
  const filteredEvents = useFilteredEvents(initialcompleted, searchData);

  useEffect(() => {
    setMaxPageVisited(1);
    setCurrentPage(1);
  }, [auctionFilter]);

  useEffect(() => {
    setCompleteAuctionList(filteredEvents);
  }, [filteredEvents]);

  useEffect(() => {
    dispatch(
      singleSellerAuction(
        id,
        "completed",
        currentPage,
        totalNumberRow,
        auctionFilter
      )
    );
  }, [dispatch, auctionFilter, currentPage, id]);

  useEffect(() => {
    setCompleteAuctionList(sellerAuctionCollection);
    setInitialcompleted(sellerAuctionCollection);
  }, [sellerAuctionCollection]);

  const memoizedCompleteAuction = useMemo(
    () => completeAuctionList,
    [completeAuctionList]
  );

  if (loading) {
    return <CommanLoader />;
  }

  return (
    <>
      <div className="table-container-style">
        {memoizedCompleteAuction?.length === 0 && searchData !== "" ? (
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
        {memoizedCompleteAuction?.length === 0 && searchData === "" && (
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
    <td
      className="cercle-purple-text pointer text-decoration-underLine"
      onClick={() => {
        if (item?.auctionType === "reverseAuctionProduct") {
          navigate(
            `/completed/reverse-product-auction/auction-details/${item?._id}`
          );
        } else if (item?.auctionType === "reverseAuctionService") {
          navigate(
            `/completed/reverse-service-auction/auction-details/${item?._id}`
          );
        } else {
          navigate(`/completed/forward-auction/auction-details/${item?._id}`);
        }
      }}
    >
      View Auction
    </td>
  </tr>
);

export default CompleteAuctionTables;
