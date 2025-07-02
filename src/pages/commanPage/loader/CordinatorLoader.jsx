import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CordinatorLoader = () => {
  return (
    <ul
      className="collapsible flex column "
      style={{ gap: "10px", width: "75%", margin: "auto" }}
    >
      
      {Array(5)
        .fill()
        .map((_, index) => (
          <li
            key={index}
            className="white pointer gap-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <div className="valign-wrapper space-around">
              <Skeleton circle={true} height={40} width={40} className="mr-1" />
              <Skeleton width={100} height={24} />
            </div>
            <span className="valign-wrapper">
              <Skeleton circle={true} height={20} width={20} className="mr-1" />
              <Skeleton width={100} height={20} />
            </span>
            <span className="valign-wrapper">
              <Skeleton circle={true} height={20} width={20} className="mr-1" />
              <Skeleton width={100} height={20} />
            </span>
            <span className="valign-wrapper">
              <Skeleton circle={true} height={20} width={20} className="mr-1" />
              <Skeleton width={100} height={20} />
            </span>
            <span className="valign-wrapper">
              <Skeleton circle={true} height={20} width={20} className="mr-1" />
              <Skeleton width={100} height={20} />
            </span>
          </li>
        ))}
    </ul>
  );
};

export default CordinatorLoader;
