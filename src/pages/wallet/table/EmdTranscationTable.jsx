import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Pagination from "../../commanPage/paginationUi/Pagination";
import { capitalizeFirstLetter, convertTo12HourFormat, formatRole, handleDateSetUp } from "../../../helper/helpers";

function EmdTranscationTable({ EmdTranscationCollection }) {
  const totalNumberRow = 100;
  const [currentPage, setCurrentPage] = useState(0);
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <>
      <div className={`mt-1 ${!isTablet && "table-container-style"}`}>
        <table
          className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="white">
           {EmdTranscationCollection
                ?.slice(currentPage, currentPage + totalNumberRow)
                ?.map((items, index) => (
                  <tr className="white black-text" key={items.id}>
                    <td>
                      {items.status === "completed" ? (
                        <img
                          style={{ width: "30px" }}
                          src={`${process.env.PUBLIC_URL}/icons/${
                            items.amount < 0
                              ? "wallet-minus.svg"
                              : "wallet-add.svg"
                          }`}
                          alt="Icon"
                        />
                      ) : (
                        <img
                          style={{ width: "30px" }}
                          src={`${process.env.PUBLIC_URL}/icons/wallet-pending.svg`}
                          alt="Icon"
                        />
                      )}
                    </td>
                    <td>{Math.abs(items.amount)}</td>
                    <td>{handleDateSetUp(items?.timestamp)}</td>
                    <td>{convertTo12HourFormat(items?.timestamp)}</td>
                    <td>{formatRole(items?.type)}</td>
                    <td>{capitalizeFirstLetter(items.status)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {(!EmdTranscationCollection || EmdTranscationCollection?.length === 0) && (
          <div className="full-width column grey-text p-1 noItems-height flex align-center justify-center ">
            <span className="material-symbols-outlined large-size ">
              receipt_long
            </span>
            <p>No data found.</p>
          </div>
        )}
      </div>

      <Pagination
        Data={EmdTranscationCollection || []}
        totalNumberRow={totalNumberRow}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default EmdTranscationTable;
