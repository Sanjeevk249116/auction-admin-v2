import React from "react";
import { useSelector } from "react-redux";
import CatalogueFrameSkeleton from "../../../../../../commanPage/loader/CatalogueLoading";

function HeaderFrame({
  id,
  mouseOnSwitch,
  itemOpens,
  childrenFirst,
  childrenSecond,
}) {
  const { readCatalogueLoading } = useSelector((state) => state.catelogueData);
  if (readCatalogueLoading) {
    return (
      <div>
        {" "}
        <CatalogueFrameSkeleton />
      </div>
    );
  }
  return (
    <li
      id={id}
      className="border-radius-12 border-1px"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",

        borderRadius: "8px",
      }}
    >
      <div
        className={`${
          !mouseOnSwitch && "collapsible-header"
        } valign-wrapper space-between top-border-radius`}
        style={{
          padding: "1rem 2rem",
          borderRadius: "8px",
          borderBottom: itemOpens && "1px solid #e0e0e0",
        }}
      >
        {childrenFirst}
      </div>
      <div className="collapsible-body " style={{ border: "none" }}>
        {childrenSecond}
      </div>
    </li>
  );
}

export default HeaderFrame;
