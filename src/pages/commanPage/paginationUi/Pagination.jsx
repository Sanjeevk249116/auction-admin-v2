import React from "react";
import ReactPaginate from "react-paginate";
import { getTotalPages, handlePageClick } from "../../../helper/helpers";

function Pagination({ totalNumberRow, Data, setCurrentPage }) {
  return (
    <ReactPaginate
      className="valign-wrapper justify-center font-18px pointer p-1 "
      breakLabel="..."
      nextLabel={<button>Next →</button>}
      pageRangeDisplayed={2}
      pageCount={getTotalPages(Data?.length, totalNumberRow)}
      previousLabel={<> ←</>}
      onPageChange={(e) => handlePageClick(e, setCurrentPage, totalNumberRow)}
      renderOnZeroPageCount={null}
      activeClassName="activePage cercle-purple"
      pageClassName="pagination-item" // Custom class for each page item
      previousClassName="pagination-item" // Custom class for previous button
      nextClassName="pagination-item" // Custom class for next button
      breakClassName="pagination-item" // Custom class for break label
      disabledClassName="disabledButton"
    />
  );
}

export default Pagination;
