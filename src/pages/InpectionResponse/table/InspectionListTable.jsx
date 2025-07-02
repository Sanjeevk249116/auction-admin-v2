import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import Paginations from "../../commanPage/paginationUi/Paginations";
import {
  capitalizeFirstLetter,
  convertTo12HourFormat,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../helper/helpers";
import requestGetData from "../../../jsonData/inspectionResponse.json";

function InspectionListTable({ searchList }) {
  const totalNumberRow = 30;
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageVisited, setMaxPageVisited] = useState(1);
  const [inspectionData, setInspectionData] = useState([...requestGetData]);
  const [filterInspection, setFilterInspection] = useState([...requestGetData]);

  useEffect(() => {
    const searchLower = searchList?.toLowerCase()?.trim();
    if (!searchLower) {
      setInspectionData([...filterInspection]);
    } else {
      const filteredDetails = filterInspection?.filter((item) =>
        ["auctionId", "seller", "inspectionBy", "auctionSchedule", "status"].some(
          (field) => {
            if (field === "auctionSchedule") {
              return ["startDate", "startingTime", "endingTime"].some(
                (subField) => {
                  const fieldValue = item?.auction?.auctionSchedule?.[subField];
                  if (!fieldValue) return false;
                  if (
                    subField === "startingTime" ||
                    subField === "endingTime"
                  ) {
                    return convertTo12HourFormat(
                      new Date(fieldValue).toLocaleTimeString()
                    )
                      .toLowerCase()
                      .includes(searchLower);
                  }
                  return fieldValue?.toLowerCase()?.includes(searchLower);
                }
              );
            } else if (field === "seller") {
              const seller = item.seller?.organizationName?.toLowerCase();
              return seller?.includes(searchLower);
            } else if (field === "auctionId") {
              const fieldValue = item.auction?.[field];
              return fieldValue?.toLowerCase()?.includes(searchLower);
            } else {
              const fieldValue = item?.[field];
              return fieldValue?.toLowerCase()?.includes(searchLower);
            }
          }
        )
      );

      setInspectionData(filteredDetails);
    }
  }, [searchList, filterInspection]);

  return (
    <div className="mt-1">
      <div className={`table-container-style`}>
        <table
          className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
        >
          <thead>
            <tr>
              <th>Auction ID</th>
              <th>Inspection date </th>
              <th>Inspection By</th>
              <th>Inspection To</th>
              <th>No. of offer</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inspectionData?.map((items, index) => (
              <tr key={items?._id} className="white black-text">
                <td>
                  <span
                    className="pointer text-decoration-underLine onHover"
                    onClick={() =>
                      navigate(`/single-auction/${items?._id}`)
                    }
                  >
                    {items?.auction?.auctionId || "..."}
                  </span>
                </td>
                <td>{handleDateSetUp(items?.inspectionDate)}</td>
                <td>{items?.inspectionBy}</td>
                <td>{"Sanjeev Kushwaha"}</td>
                <td>{4}</td>
                <td style={{ width: "250px" }}>
                  <span className=" NoOfline" style={{ WebkitLineClamp: 1 }}>
                    {items?.inspectionLocation}
                  </span>
                </td>
                <td
                  style={{
                    color: items?.status === "pending" ? "#EAB11F" : "#4EAB33",
                  }}
                >
                  {capitalizeFirstLetter(items?.status)}
                </td>

                <td>


                  <span
                    className="material-icons-outlined pointer"
                    onClick={() => navigate("/inpection-details")}
                  >
                    visibility
                  </span>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inspectionData?.length === 0 && <NoItemsLeftInTable />}
      </div>
      {inspectionData?.length > 0 && <Paginations
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalNumberRow={totalNumberRow}
        totalData={inspectionData?.length}
        maxPageVisited={maxPageVisited}
        setMaxPageVisited={setMaxPageVisited}
      />}

      {/* <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <InspectionModal personalDetails={auctionInformation} />
      </Modal> */}
    </div>
  );
}

export default InspectionListTable;
