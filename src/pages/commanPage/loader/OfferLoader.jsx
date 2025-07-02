import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function OfferLoader({ label = false }) {
  return (
    <div className="loader full-width flex space-between cover p-2 white pin-top">
      <Skeleton width={100} height={50} />
      <Skeleton width={150} height={50} />
      <Skeleton width={150} height={50} />
      <Skeleton width={150} height={50} />
      <Skeleton width={150} height={50} />
      <Skeleton width={100} height={50} />
      {label && (
        <p
          className="button-style white-text font-18px select-label"
          style={{
            padding: "8px 20px",
            top: "-20px",
            left: "2%",
          }}
        >
          <Skeleton width={240} height={40} />
        </p>
      )}
    </div>
  );
}

export default OfferLoader;
