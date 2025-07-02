import React from "react";
import { useMediaQuery } from "react-responsive";

function TableHeaderPrototype({ name1, name2 = false }) {
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  return (
    <th className="">
      <span>
        <span className={`${!isTablet && "flex column"}`}>{name1}</span> <span>{name2}</span>
      </span>
    </th>
  );
}

export default TableHeaderPrototype;
