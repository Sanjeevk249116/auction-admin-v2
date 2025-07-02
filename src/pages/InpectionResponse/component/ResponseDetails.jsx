import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";

function ResponseDetails({ loading = false }) {
  const details = useMemo(
    () => [
      {
        label: "Trader Id",
        value: `CERCLEX-16334 `,
      },
      {
        label: "Inspection date",
        value: `25-08-2024`,
      },
      {
        label: "Inspected by",
        value: `Manoj Prabhu`,
      },
      {
        label: "No.of Peoples",
        value: `3`,
      },
    ],
    []
  );
  return (
    <div className="mt-1">
      <h4>Response Details</h4>
      <div className={`cover white text-center auctionStyle mt-1`}>
        {details?.map((detail, index) => (
          <span key={detail?.label}>
            <label className="cercle-purple-text font-18px">
              {loading ? <Skeleton width={100} /> : detail.label}
            </label>
            <p className={`mb-1 black-text `}>
              {loading ? <Skeleton width={200} /> : detail.value}
            </p>
          </span>
        ))}
      </div>
    </div>
  );
}

export default ResponseDetails;
