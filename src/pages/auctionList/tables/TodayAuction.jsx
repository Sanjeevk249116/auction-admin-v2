import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import {
  auctionTypeStyle,
  catalogueStatus,
  convertTo12HourFormat,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../helper/helpers";
import Paginations from "../../commanPage/paginationUi/Paginations";
import useFilteredEvents from "../../../helper/filterEvent";
import { useDispatch, useSelector } from "react-redux";
import { getTodayAuction } from "../../../redux/action/auctionStatus";
import CommanLoader from "../../commanPage/loader/CommanLoader";

function TodayAuction({ searchTraderList, auctionFilter }) {
  const totalNumberRow = 30;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [todayAuctionList, setTodayAuctionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageVisited, setMaxPageVisited] = useState(1);
  const { todayAuctionCollection, loading } = useSelector(
    (state) => state.auctionStatus
  );
  const [initialTodayAuctionData, setInitialTodayAuctionData] = useState([]);
  const filteredEvents = useFilteredEvents(
    initialTodayAuctionData,
    searchTraderList
  );

  useEffect(() => {
    setMaxPageVisited(1);
    setCurrentPage(1);
  }, [auctionFilter]);

  useEffect(() => {
    setTodayAuctionList(filteredEvents);
  }, [filteredEvents]);

  useEffect(() => {
    dispatch(getTodayAuction(currentPage, totalNumberRow, auctionFilter));
  }, [dispatch, auctionFilter, currentPage]);

  useEffect(() => {
    setTodayAuctionList(todayAuctionCollection);
    setInitialTodayAuctionData(todayAuctionCollection);
  }, [todayAuctionCollection]);

  if (loading) {
    return <CommanLoader />;
  }

  return (
    <>
      <div className={`${!isTablet && "table-container-style"}`}>
        {todayAuctionList?.length <= 0 && searchTraderList !== "" ? (
          <NoItemsLeftInTable />
        ) : (
          <table
            className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
              } `}
          >
            <thead className="grey lighten-4 ">
              <tr className="centered">
                <th>Auction ID</th>
                <th>Auction Region</th>
                <th>Description</th>
                <th>Auction Type</th>
                <th>Date/Time</th>
                <th>Catalogue status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todayAuctionList?.map((items) => (
                <tr key={items._id}>
                  <td >{items?.auctionId}{items?.location?.state && ` -${items?.location?.state}`}</td>
                  <td>{items?.auctionRegion || "..."}</td>
                  <td style={{ width: !isTablet && "300px" }}>
                    <p className="NoOfline" style={{ WebkitLineClamp: 1 }}>
                      {items.description}
                    </p>
                  </td>
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

                  <td>
                    <p>
                      {handleDateSetUp(items?.auctionSchedule?.startDate)}
                      {" , "}
                      {convertTo12HourFormat(
                        items?.auctionSchedule?.startingTime
                      )}{" "}
                      to{" "}
                      {convertTo12HourFormat(
                        items?.auctionSchedule?.endingTime
                      )}
                    </p>
                  </td>
                  <td
                    className={`${items?.catalogue?.industryApproval?.status === "approval"
                      ? "green-text"
                      : items?.catalogue?.industryApproval?.status === "notApproval"
                        ? "red-text"
                        : "orange-text"
                      }`}
                    style={{ width: !isTablet && "150px" }}
                  >
                    <span>
                      {catalogueStatus(items?.catalogue?.industryApproval?.status)}
                    </span>
                  </td>
                  <td>
                    <span
                      className="material-icons-outlined cercle-purple-text pointer"
                      onClick={() => {
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
                          navigate(`/forward-auction/auction-details/${items?._id}`);
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
        )}
        {todayAuctionList?.length === 0 && searchTraderList === "" && (
          <NoItemsLeftInTable />
        )}
      </div>
      {todayAuctionList?.length !== 0 && (
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalNumberRow={totalNumberRow}
          totalData={todayAuctionList?.length}
          maxPageVisited={maxPageVisited}
          setMaxPageVisited={setMaxPageVisited}
        />
      )}
    </>
  );
}

export default TodayAuction;
