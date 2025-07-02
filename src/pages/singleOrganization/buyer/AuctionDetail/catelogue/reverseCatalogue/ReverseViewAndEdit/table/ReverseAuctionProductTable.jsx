import React from "react";
import { useMediaQuery } from "react-responsive";
import { Tooltip as ReactTooltip } from "react-tooltip";
import TableHeaderPrototype from "../../../editAndView/prototype/TableHeaderPrototype";

function ReverseAuctionProductTable({
  catelogueInformation,
  handleDivClick,
  editValue,
}) {
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const formatString = (text) => {
    if (typeof text !== "string") return text;
    return text?.replace(/^"|"$/g, "");
  };

  return (
    <div className="table-container-style mt-1">
      <table
        className={`responsive-table centered ${
          isTablet
            ? "auction_table table-style"
            : "custom-table-style catelogTable"
        } `}
      >
        <thead>
          <tr>
            <TableHeaderPrototype name1={"Item No"} />
            <TableHeaderPrototype name1={"Particulars"} />
            <TableHeaderPrototype name1={"Quantity"} />
            <TableHeaderPrototype name1={"UOM"} />
            <TableHeaderPrototype name1={"Bid Basis"} />
            {editValue && <TableHeaderPrototype name1={"Image upload"} />}
          </tr>
        </thead>
        <tbody style={{ whiteSpace: "wrap", overflowX: "unset" }}>
          {catelogueInformation?.productList?.map((row, index) => (
            <tr key={row._id}>
              <td>{index + 1}</td>
              <td style={{ width: !isTablet && "80px" }}>
                {row?.productDetails?.type}
              </td>
              <td>{row?.productDetails?.quantity}</td>
              <td>{row?.productDetails?.unit}</td>
              <td>Rupees (INR)</td>
              {editValue && (
                <td style={{ width: !isTablet && "20px" }}>
                  <span
                    class="pointer material-symbols-outlined"
                    onClick={() => handleDivClick(row?.productDetails?.type)}
                  >
                    cloud_upload
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {catelogueInformation?.productList?.map((item) => (
        <React.Fragment key={item?._id}>
          <ReactTooltip
            id={`tooltip-${item?._id}/location`}
            place="top"
            content={
              <p
                className="flex justify-center"
                style={{ width: "200px", margin: "auto" }}
              >
                {formatString(item?.location) || "..."}
              </p>
            }
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default ReverseAuctionProductTable;
