import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { handleDateSetUp, NoItemsLeftInTable } from "../../../helper/helpers";
import Paginations from "../../commanPage/paginationUi/Paginations";
import TableLoader from "../../commanPage/loader/TableLoader";

function EmdPaidTables({ paidEmdDetails, offerDetailLoading }) {
  const numberOfRow = 20;
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="mt-1">
      {offerDetailLoading ? (
        <div className="valign-wrapper justify-center cover white">
          <TableLoader headerData={["Organization Name", "Amount", "Date"]} />
        </div>
      ) : (
        <div className="table-container-style">
          <table
            className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
              } `}
          >
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Organization Name</th>
                <th>GST</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paidEmdDetails
                ?.slice(currentPage, currentPage + numberOfRow)
                ?.map((items, index) => (
                  <tr key={items?._id}>
                    <td>{index + 1}</td>
                    <td>{items?.organization?.organizationName || "N/A"}</td>
                    <td>{items?.organization?.GSTIN || "N/A"}</td>
                    <td>{handleDateSetUp(items?.date)}</td>
                    <td>{items?.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {paidEmdDetails?.length === 0 && <NoItemsLeftInTable />}
        </div>
      )}
      {paidEmdDetails?.length > numberOfRow - 5 && (
        <Paginations
          Data={paidEmdDetails}
          totalNumberRow={numberOfRow}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default EmdPaidTables;
