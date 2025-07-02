import React from "react";
import { handleDateSetUp } from "../../../helper/helpers";

function SpecificDate({ specificDates, toolValue }) {
  return (
    <div className="pointer" data-tooltip-id={toolValue}>
      {specificDates?.map((item) => (
        <span className="" key={item}>
          {handleDateSetUp(item)},{" "}
        </span>
      ))}
    </div>
  );
}

export default SpecificDate;
