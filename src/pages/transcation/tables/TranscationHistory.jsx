import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Pagination from "../../commanPage/paginationUi/Pagination";

function TranscationHistory({ recentTransaction }) {
  const totalNumberRow = 50;
  const [currentPage, setCurrentPage] = useState(0);
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <>
      <div className={`mt-1 ${!isTablet && "table-container-style"}`}>
        <table
          className={`responsive-table centered ${
            isTablet ? "auction_table table-style" : "custom-table-style"
          } `}
        >
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction Category</th>
            </tr>
          </thead>
          <tbody className="white">
            {recentTransaction
              ?.slice(currentPage, currentPage + totalNumberRow)
              ?.map((items, index) => (
                <tr className="white black-text" key={items?._id}>
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
                  <td>
                    <span>
                      {new Date(items.timestamp).toLocaleDateString("en-GB")}
                    </span>
                    <span> {items.time}</span>
                  </td>
                  <td>{items.amount}</td>
                  <td>{items.status}</td>
                  <td>{items.type}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {(!recentTransaction || recentTransaction?.length === 0) && (
          <div className="full-width column grey-text p-1 noItems-height flex align-center justify-center ">
            <span className="material-symbols-outlined large-size ">
              receipt_long
            </span>
            <p>No data found.</p>
          </div>
        )}
      </div>

      <Pagination
        Data={recentTransaction||[]}
        totalNumberRow={totalNumberRow}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default TranscationHistory;
