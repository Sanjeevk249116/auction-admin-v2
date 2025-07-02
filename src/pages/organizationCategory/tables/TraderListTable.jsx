import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Paginations from "../../commanPage/paginationUi/Paginations";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOfAllTraders } from "../../../redux/action/trader";
import TableLoader from "../../commanPage/loader/TableLoader";
import {
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../helper/helpers";

function TraderListTable({ searchData }) {
  const totalNumberRow = 100;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageVisited, setMaxPageVisited] = useState(1);
  const [allTraderList, setAllTraderList] = useState([]);
  const [initialTraderList, setInitialTraderList] = useState([]);

  const { tradersList, tradersListLoading } = useSelector(
    (state) => state.tradersList
  );

  useEffect(() => {
    dispatch(listOfAllTraders(currentPage, totalNumberRow));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setAllTraderList(tradersList);
    setInitialTraderList(tradersList);
  }, [tradersList]);

  useEffect(() => {
    const searchLower = searchData?.toLowerCase()?.trim();
    if (!searchLower) {
      setAllTraderList([...initialTraderList]);
    } else {
      const filteredList = initialTraderList?.filter((item) => {
        return (
          item?.organizationName?.toLowerCase()?.includes(searchLower) ||
          item?.owner?.name?.toLowerCase()?.includes(searchLower) ||
          item?.owner?.email?.toLowerCase()?.includes(searchLower) ||
          item?.owner?.phoneNumber?.toLowerCase()?.includes(searchLower) ||
          item?.subscriptionPlan?.planName?.toLowerCase()?.includes(searchLower)
        );
      });
      setAllTraderList(filteredList);
    }
  }, [searchData, initialTraderList]);

  if (tradersListLoading && allTraderList?.length === 0) {
    return (
      <div className="valign-wrapper justify-center cover white mt-1">
        <TableLoader
          headerData={[
            "Auction ID",
            "Organization Name",
            "Description",
            "Auction Type",
            "Date/Timings",
            "Actions",
          ]}
        />
      </div>
    );
  }

  return (
    <>
      <div className="table-container-style mt-1">
        <table
          className={`responsive-table centered ${
            isTablet ? "auction_table table-style" : "custom-table-style"
          } `}
        >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Organization Name</th>
              <th>Owner Name</th>
              <th>Email Id</th>
              <th>Phone Number</th>
              <th>Created At</th>
              <th>Account Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allTraderList?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?.organizationName||"N/A"}</td>
                <td>{item?.owner?.name}</td>
                <td>{item?.owner?.email || "N/A"}</td>
                <td>{item?.owner?.phoneNumber || "N/A"}</td>
                <td>
                  {handleDateSetUp(item?.createdAt)}
                </td>
                <td>
                  <span
                    className={`${
                      item?.verified ? "green-text" : "orange-text"
                    }`}
                  >
                    {item?.verified ? "Verified" : "Pending"}
                  </span>
                </td>
                <td>
                  <span
                    className="material-icons-outlined pointer cercle-purple-text"
                    onClick={() =>
                      navigate(`/single-organization-detail/${item?._id}`)
                    }
                  >
                    visibility
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allTraderList?.length === 0 && <NoItemsLeftInTable />}
      </div>
      <Paginations
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalNumberRow={totalNumberRow}
        totalData={tradersList?.length}
        maxPageVisited={maxPageVisited}
        setMaxPageVisited={setMaxPageVisited}
      />
    </>
  );
}

export default TraderListTable;
