import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Paginations from "../../commanPage/paginationUi/Paginations";
import { useNavigate } from "react-router-dom";
import TableLoader from "../../commanPage/loader/TableLoader";
import { useDispatch, useSelector } from "react-redux";
import { listOfAllSeller } from "../../../redux/action/seller";
import { handleDateSetUp, NoItemsLeftInTable } from "../../../helper/helpers";

function SellerListTable({ searchData }) {
  const totalNumberRow = 100;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(1);
  const [allSellerList, setAllSellerList] = useState([])
  const [initialAllSellerList, setInitialAllSellerList] = useState([]);
  const [maxPageVisited, setMaxPageVisited] = useState(1);
  const { sellerList, sellerListLoading } = useSelector(
    (state) => state.sellerList
  );

  useEffect(() => {
    const searchLower = searchData?.toLowerCase()?.trim();
    if (!searchLower) {
      setAllSellerList([...initialAllSellerList]);
    } else {
      const filteredList = initialAllSellerList?.filter((item) => {
        return (
          item?.organizationName?.toLowerCase()?.includes(searchLower) ||
          item?.owner?.name?.toLowerCase()?.includes(searchLower) ||
          item?.owner?.email?.toLowerCase()?.includes(searchLower) ||
          item?.owner?.phoneNumber?.toLowerCase()?.includes(searchLower) ||
          item?.subscriptionPlan?.planName?.toLowerCase()?.includes(searchLower)
        );
      });
      setAllSellerList(filteredList);
    }
  }, [searchData, initialAllSellerList]);

  useEffect(() => {
    setAllSellerList(sellerList);
    setInitialAllSellerList(sellerList);
  }, [sellerList]);

  useEffect(() => {
    dispatch(listOfAllSeller(currentPage, totalNumberRow));
  }, [dispatch, currentPage]);

  if (sellerListLoading && allSellerList?.length === 0) {
    return (
      <div className="valign-wrapper justify-center cover white">
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
          className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
        >
          <thead>
            <tr>
              <th>S.No</th>
              <th>Organization Name</th>
              <th>Owner Name</th>
              <th>Email Id</th>
              <th>Phone Number</th>
              <th>GST No</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allSellerList?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item?.organizationName}</td>
                <td>{item?.owner?.name || "N/A"}</td>
                <td>{item?.owner?.email || "N/A"}</td>
                <td>{item?.owner?.phoneNumber || "N/A"}</td>
                <td>{item?.GSTIN || "N/A"}</td>
                <td>{handleDateSetUp(item?.createdAt)}</td>
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
        {allSellerList?.length === 0 && <NoItemsLeftInTable />}
      </div>
      <Paginations
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalNumberRow={totalNumberRow}
        totalData={allSellerList?.length}
        maxPageVisited={maxPageVisited}
        setMaxPageVisited={setMaxPageVisited}
      />
    </>
  );
}

export default SellerListTable;
