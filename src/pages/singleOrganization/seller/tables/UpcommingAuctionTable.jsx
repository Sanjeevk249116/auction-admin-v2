import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import Paginations from "../../../commanPage/paginationUi/Paginations";
import {
  auctionTypeStyle,
  catalogueStatus,
  convertTo12HourFormat,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../../helper/helpers";
import useFilteredEvents from "../../../../helper/filterEvent";
import { useDispatch, useSelector } from "react-redux";
import { singleSellerAuction } from "../../../../redux/action/singleSellerAuction";
import CommanLoader from "../../../commanPage/loader/CommanLoader";

function UpcommingAuctionTable({ searchData, auctionFilter }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const totalNumberRow = 30;
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageVisited, setMaxPageVisited] = useState(1);
  const [upcommingAuctions, setUpcommingAuctions] = useState([]);
  const [initialUpcommingAuction, setInitialUpcommingAuction] = useState([]);
  const { sellerAuctionCollection, loading } = useSelector(
    (state) => state.singleSellerAuction
  );
  const filteredEvents = useFilteredEvents(initialUpcommingAuction, searchData);

  useEffect(() => {
    setUpcommingAuctions(filteredEvents);
  }, [filteredEvents]);

  useEffect(() => {
    setMaxPageVisited(1);
    setCurrentPage(1);
  }, [auctionFilter]);

  useEffect(() => {
    dispatch(
      singleSellerAuction(
        id,
        "upcoming",
        currentPage,
        totalNumberRow,
        auctionFilter
      )
    );
  }, [dispatch, auctionFilter, currentPage, id]);

  useEffect(() => {
    setUpcommingAuctions(sellerAuctionCollection);
    setInitialUpcommingAuction(sellerAuctionCollection);
  }, [sellerAuctionCollection]);

  const memoizedUpcommingAuctions = useMemo(
    () => upcommingAuctions,
    [upcommingAuctions]
  );

  if (loading) {
    return <CommanLoader />;
  }

  return (
    <>
      <div className="table-container-style">
        {memoizedUpcommingAuctions?.length === 0 && searchData !== "" ? (
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
                <th>Catalogue status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {memoizedUpcommingAuctions?.map((items) => (
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
        {memoizedUpcommingAuctions?.length === 0 && searchData === "" && (
          <NoItemsLeftInTable />
        )}
      </div>
      {memoizedUpcommingAuctions?.length !== 0 && (
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalNumberRow={totalNumberRow}
          totalData={memoizedUpcommingAuctions?.length}
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
      className={`${
        item?.catalogue?.industryApproval?.status === "approval"
          ? "green-text"
          : item?.catalogue?.industryApproval?.status === "notApproval"
          ? "red-text"
          : "orange-text"
      }`}
      style={{ width: !isTablet && "150px" }}
    >
      <span>{catalogueStatus(item?.catalogue?.industryApproval?.status)}</span>
    </td>
    <td>
      <span
        className="material-icons-outlined cercle-purple-text pointer"
        onClick={() => {
          if (item?.auctionType === "reverseAuctionProduct") {
            navigate(`/reverse-product-auction/auction-details/${item?._id}`);
          } else if (item?.auctionType === "reverseAuctionService") {
            navigate(`/reverse-service-auction/auction-details/${item?._id}`);
          } else {
            navigate(`/forward-auction/auction-details/${item?._id}`);
          }
        }}
      >
        visibility
      </span>
    </td>
  </tr>
);

export default UpcommingAuctionTable;
