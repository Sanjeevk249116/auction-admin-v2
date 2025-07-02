import React from "react";
import {
  formate24hrsTo12hrs,
  getTimeFromdate,
  handleDateSetUp,
} from "../../../../../helper/helpers";

function HistoryResponse({ item }) {
  return (
    <>
      <p style={{ whiteSpace: "pre-wrap" }}>{item?.message}</p>
      <p
        className="flex justify-end select-label"
        style={{ right: 10, bottom: 5,fontSize:"12px" }}
      >
        {formate24hrsTo12hrs(getTimeFromdate(item?.date))},{" "}
        {handleDateSetUp(item?.date)}
      </p>
    </>
  );
}

export default HistoryResponse;
