import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { NoItemsLeftInTable } from "../../../helper/helpers";
import Paginations from "../paginationUi/Paginations";
import TableLoader from "../loader/TableLoader";

function ProductOfferListTable({
  offers,
  loading = false,
}) {
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
            "Product Name",
            "Product Type",
            "Quantity / UOM",
            "EMD Amount (Rs.)",
            "Starting price (Rs.)",
            "Max Decrement",
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
              <th>Product Type</th>
              <th>Event Fee</th>
              <th>Quantity / UOM</th>
              <th>EMD Amount (Rs.)</th>
              <th>Starting price (Rs.)</th>
              <th>Max Decrement(Rs.)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers
              ?.slice(currentPage, currentPage + totalNumberRow)
              ?.map((items, index) => (
                <tr key={items?._id}>
                  <td>{index + 1}</td>
                  <td style={{ width: !isTablet && "230px" }}>
                    <span className="NoOfline" style={{ WebkitLineClamp: 1 }}>
                      {items?.productDetails?.type}
                    </span>
                  </td>
                  <td>{items?.eventFee || 0}</td>
                  <td>
                    {items?.productDetails?.quantity}/{items?.productDetails?.unit}
                  </td>
                  <td>{items?.EMDAmount}</td>
                  <td>
                    {items?.startingPrice > 0 ? items?.startingPrice : "N/A"}
                  </td>
                  <td>{items?.minimumBidDecrease}</td>

                  <td>
                    <button
                      className="cercle-purple-text text-decoration-underLine pointer"
                      onClick={() =>
                        navigate(`/product-reverse-auction/singleOffer/${items.auction}/${items._id}`)
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

export default ProductOfferListTable;
