import React from "react";
import Skeleton from "react-loading-skeleton";

function TimeSlotLoader() {
  return (
    <div className="p-1 cover white border-1px">
      <div className="valign-wrapper space-between mb-1">
        <Skeleton width={100} />
        <Skeleton width={230} />
      </div>
      <div
        className="custom-scrollbar"
        style={{
          height: "345px",
          overflowY: "auto",
          paddingRight: "2px",
        }}
      >
        {[...Array(2)]?.map((items, index) => (
          <div
            key={index}
            className={`p-1 white-text border-radius-12 mb-1 full-width`}
          >
            <Skeleton width={550} height={50} />
            <Skeleton width={550} height={50} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeSlotLoader;
