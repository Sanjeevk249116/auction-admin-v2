import React, { useEffect, useState } from "react";
import { convertTo12HourFormat } from "../../../../../helper/helpers";
import { useMediaQuery } from "react-responsive";

function TimeSlot({ singleAuctionData }) {
  
  const isLaptop = useMediaQuery({ query: "(max-width: 1140px)" });
  const [searchLots, setSearchLots] = useState("");
  const [auctionDetails, setAuctionDetails] = useState([]);
  const [copyIntialData, setCopyIntialData] = useState([]);

  useEffect(() => {
    setAuctionDetails(singleAuctionData?.offers);
    setCopyIntialData(singleAuctionData?.offers);
  }, [singleAuctionData]);

  useEffect(() => {
    const searchLower = searchLots?.toLowerCase();
    if (!searchLower?.trim()) {
      setAuctionDetails(copyIntialData);
    } else {
      const filteredDetails = copyIntialData?.filter((item) =>
        ["offerNumber", "offerSchedule"].some((field) => {
          // if (field === "offerSchedule") {
          //   return ["startTimeAndDate", "endTimeAndDate"].some((subField) => {
          //     const fieldValue = item[field]?.[subField];
          //     return typeof fieldValue === "string" &&
          //       convertTo12HourFormat(fieldValue)
          //         .toLowerCase()
          //         .includes(searchLower);
          //   });
          // }
          if (field === "offerNumber") {
            const fieldValue = item[field];
            return fieldValue.toString() === searchLower;
          }
          return false;
        })
      );
      setAuctionDetails(filteredDetails);
    }
  }, [searchLots, copyIntialData]);

  return (
    <div className="p-1 cover white border-1px">
      <div className="valign-wrapper space-between mb-1">
        <h4 className="cercle-black-text ">Time Slots</h4>
        <div
          className="input-field-style "
          style={{
            height: "40px",
            width: "230px",
          }}
        >
          <span className="material-symbols-outlined primary ">search</span>
          <input
            className="browser-default input-field  "
            placeholder="Search by lot "
            type="text"
            onChange={(e) => setSearchLots(e.target.value)}
          />
        </div>
      </div>
      <div
        className="custom-scrollbar"
        style={{
          height: !isLaptop && "350px",
          overflowY: "auto",
          paddingRight: "2px",
        }}
      >
        {auctionDetails?.length <= 0 && (
          <h6
            className="font-cercular-bold black-text valign-wrapper justify-center"
            style={{ height: "300px" }}
          >
            No items found ...
          </h6>
        )}
        {auctionDetails?.map((items, index) => (
          <div
            key={items._id}
            className={`p-1 white-text border-radius-12 mb-1 full-width`}
            style={{
              backgroundColor:
                index % 2 === 0 ? "rgba(63, 0, 123, 1)" : "rgba(39, 0, 89, 1)",
            }}
          >
            <p>Lot No: {items?.offerNumber}</p>
            <p>
              Lot Time:{" "}
              {`${convertTo12HourFormat(
                items?.offerSchedule?.startTimeAndDate
              )} - ${convertTo12HourFormat(
                items?.offerSchedule?.endTimeAndDate
              )}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeSlot;
