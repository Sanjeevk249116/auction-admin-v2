import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TableLoader({ headerData }) {
  return (
    <table className="custom-table-style centered responsive-table">
      <thead>
        <tr>
          {headerData.map((col, index) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(7)
          .fill()
          .map((_, rowIndex) => (
            <tr key={rowIndex}>
              {headerData.map((col, colIndex) => (
                <td key={colIndex}>
                  <Skeleton width={200} />
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TableLoader;
