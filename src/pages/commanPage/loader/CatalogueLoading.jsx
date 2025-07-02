// HeaderFrameSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CatalogueFrameSkeleton() {
  return (
    <div
      className="border-radius-12 border-1px mt-1"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        borderRadius: "8px",
      }}
    >
      <Skeleton height={15} count={3} style={{ marginBottom: "0.5rem" }} />
    </div>
  );
}

export default CatalogueFrameSkeleton;
