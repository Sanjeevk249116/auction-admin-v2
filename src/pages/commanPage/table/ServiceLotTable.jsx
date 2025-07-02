import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { NoItemsLeftInTable } from "../../../helper/helpers";
import Paginations from "../paginationUi/Paginations";
import TableLoader from "../loader/TableLoader";

function ServiceLotTable({ offers, loading = false }) {
  const totalNumberRow = 20;
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="valign-wrapper justify-center cover white">
        <TableLoader
          headerData={[
            "Lots Id",
            "Service Title",
            "Quantity / UOM",
            "EMD Amount (Rs.)",
            "Starting price (Rs.)",
            "max decrement(Rs.)",
            "Action",
          ]}
        />
      </div>
    );
  }

  return (
    <>
      <div
        className={`${
          !isTablet && "table-container-style"
        } mt-1 mb-1 full-width`}
      >
        <table
          className={`responsive-table centered ${
            isTablet ? "auction_table table-style" : "custom-table-style"
          } `}
        >
          <thead>
            <tr>
              <th>Lots Id.</th>
              <th>Service Title</th>
              <th>Event Fee</th>
              <th>Category</th>
              <th>Sub-category</th>
              <th>EMD Amount</th>
              <th>Starting price</th>
              <th>Max Decrement</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers
              ?.slice(currentPage, currentPage + totalNumberRow)
              ?.map((items, index) => (
                <tr key={items?._id}>
                  <td>{index + 1}</td>
                  <td>{items?.serviceDetails?.title}</td>
                  <td>{items?.eventFee || 0}</td>
                  <td>{items?.serviceDetails?.category}</td>
                  <td>{items?.serviceDetails?.subCategory}</td>
                  <td>{items?.EMDAmount}</td>
                  <td>
                    {items?.startingPrice > 0 ? items?.startingPrice : "N/A"}
                  </td>
                  <td>{items?.minimumBidDecrease}</td>

                  <td>
                    <button
                      className="cercle-purple-text text-decoration-underLine pointer"
                      onClick={() =>
                        navigate(`/service-reverse-auction/singleOffer/${items.auction}/${items._id}`)
                      }
                    >
                      View Lot
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {offers?.length === 0 && <NoItemsLeftInTable />}
      </div>

      {offers?.length > 20 && (
        <Paginations
          Data={offers}
          totalNumberRow={totalNumberRow}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default ServiceLotTable;
