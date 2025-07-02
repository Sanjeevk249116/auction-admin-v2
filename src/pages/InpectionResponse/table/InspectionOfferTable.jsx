import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { NoItemsLeftInTable, notifySuccess } from "../../../helper/helpers";
import Paginations from "../../commanPage/paginationUi/Paginations";

function InspectionOfferTable({
  offers,
  loading = false,
  auctionType,
  status,
}) {
  const totalNumberRow = 20;
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex column full-width mt-1">
      {loading ? (
        <></>
      ) : (
        <>
          <div
            className={`${
              !isTablet && "table-container-style"
            } mb-1 full-width`}
          >
            <table
              className={`responsive-table centered ${
                isTablet ? "auction_table table-style" : "custom-table-style"
              } `}
            >
              <thead>
                <tr>
                  <th>Offer Id.</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th>Quantity / UOM</th>
                  <th>EMD Amount (Rs.)</th>
                  <th>Starting price (Rs.)</th>
                  <th>
                    {auctionType === "reverseAuction"
                      ? "Min Decrement(Rs.)"
                      : "Min Increment(Rs.)"}
                  </th>
                  <th>Paid Emd</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {offers
                  ?.slice(currentPage, currentPage + totalNumberRow)
                  ?.map((items) => (
                    <tr key={items?._id}>
                      <td>{items?.offerId}</td>
                      <td style={{ width: !isTablet && "230px" }}>
                        <span
                          className="NoOfline"
                          style={{ WebkitLineClamp: 1 }}
                        >
                          {items?.scrapDetails?.name}
                        </span>
                      </td>
                      <td style={{ width: !isTablet && "230px" }}>
                        <span
                          className="NoOfline"
                          style={{ WebkitLineClamp: 1 }}
                        >
                          {items?.scrapDetails?.type}
                        </span>
                      </td>
                      <td>
                        {" "}
                        {items?.scrapDetails?.quantity}/
                        {items?.scrapDetails?.unit}
                      </td>
                      <td>{items?.EMDAmount}</td>
                      <td>{items?.startingPrice}</td>
                      <td>
                        {auctionType === "reverseAuction"
                          ? items?.minimumBid
                          : items?.maximumBid}
                      </td>

                      <td>Yes</td>
                      <td>
                        <span className="valign-wrapper justify-center gap-1">
                          <span
                            className="material-icons-outlined pointer"
                            onClick={() => notifySuccess("Delete Successfully")}
                          >
                            delete
                          </span>
                          <span className="material-icons-outlined pointer font-20px">
                            archive
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {offers?.length === 0 && <NoItemsLeftInTable />}
          {offers?.length > 20 && (
            <Paginations
              Data={offers}
              totalNumberRow={totalNumberRow}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default InspectionOfferTable;
