import React, { useRef } from "react";
import HistoryResponse from "./HistoryResponse";

function CatalogueHistoryRecord({ rejectCommands }) {
  const rejectRef = useRef(null);

  return (
    <div className="">
      {rejectCommands && (
        <div
          ref={rejectRef}
          className="cover white p-2"
          style={{ width: "99%", margin: "auto" }}
        >
          <div
            className="gap-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "1fr",
              alignItems: "stretch",
            }}
          >
            {rejectCommands?.map((item) => (
              <div
                key={item._id}
                className="border-radius-12 font-16px select-wrapper"
                style={{
                  textAlign: "left",
                  padding: "1rem 2rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
              >
                <HistoryResponse item={item} />
              </div>
            ))}
          </div>
          {rejectCommands.length === 0 && (
            <p className="flex justify-center font-16px">No History Record</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CatalogueHistoryRecord;
