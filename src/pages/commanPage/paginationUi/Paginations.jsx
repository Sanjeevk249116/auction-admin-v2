import React, { useEffect, useState } from "react";

function Paginations({
  currentPage,
  setCurrentPage,
  totalNumberRow,
  totalData,
  maxPageVisited,
  setMaxPageVisited,
}) {
  const [hasNextPage, setHasNextPage] = useState(false);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setHasNextPage(totalData === totalNumberRow);
    setMaxPageVisited(Math.max(maxPageVisited, currentPage));
  }, [totalData, currentPage]);

  return (
    <div className="mt-1 flex justify-center">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="paginationButton"
      >
        ←
      </button>
      {Array.from({ length: maxPageVisited }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={` paginationButton ${
            page === currentPage && "cercle-purple white-text"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className="pointer paginationButton"
      >
        Next →
      </button>
    </div>
  );
}

export default Paginations;

