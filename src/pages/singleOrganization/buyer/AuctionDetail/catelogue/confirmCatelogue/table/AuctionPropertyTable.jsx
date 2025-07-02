import React from "react";
import { useMediaQuery } from "react-responsive";
import { Tooltip as ReactTooltip } from "react-tooltip";
import TableHeaderPrototype from "../../editAndView/prototype/TableHeaderPrototype";

function AuctionPropertyTable({ catelogueInformation }) {
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const formatString = (text) => {
    if (typeof text !== "string") return text;
    return text?.replace(/^"|"$/g, '');
  };

  return (
    <div className="table-container-style">
      <table
        className={`responsive-table centered  ${isTablet ? "auction_table table-style" : "custom-table-style catelogTable"
          } `}
      >
        <thead>
          <tr>
            <TableHeaderPrototype name1={"Item No"} />
            <TableHeaderPrototype name1={"Item Name"} />
            <TableHeaderPrototype name1={"Quantity"} name2={"(Approx.)"} />
            <TableHeaderPrototype name1={"UOM"} />
            <TableHeaderPrototype name1={"Bid"} name2={"Basis"} />
            <TableHeaderPrototype name1={"Taxes"} name2={"(GST %)"} />
            <TableHeaderPrototype name1={"Taxes"} name2={"(IT- TCS %)"} />
            <TableHeaderPrototype name1={"Product"} name2={"Location"} />
            <TableHeaderPrototype
              name1={"PCB Certificate"}
              name2={"Required (Y/N)"}
            />
            <TableHeaderPrototype name1={"EMD Value"} name2={"(Rs.)"} />
            <TableHeaderPrototype name1={"Event"} name2={"Fee"} />
            {isTablet ? <TableHeaderPrototype name1={"Lifting Period (Days)"} /> : <TableHeaderPrototype name1={"Lifting Peri"} name2={"-od (Days)"} />}
          </tr>
        </thead>
        <tbody style={{ whiteSpace: "wrap", overflowX: "unset" }}>
          {catelogueInformation?.auctionProperty?.map((row, index) => (
            <tr key={row.itemNo}>
              <td>{index + 1}</td>
              <td style={{ width: "100px" }}>{row?.scrapDetails?.type}</td>
              <td>{row?.scrapDetails?.quantity}</td>
              <td>{row?.scrapDetails?.unit}</td>
              <td>{row?.scrapDetails?.unit}</td>
              <td>{row?.GSTTaxes}</td>
              <td>{row?.ItTCSTaxes}</td>
              <td>
                <p
                  className="NoOfline pointer"
                  style={{ WebkitLineClamp: 1 }}
                  data-tooltip-id={`tooltip-${row?._id}/location`}
                >
                  {formatString(row?.location) || "..."}
                </p>
              </td>
              <td>{`${row?.requiresPCBCertificate ? "Yes" : "No"}`}</td>
              <td>₹ {row?.EMDAmount}</td>
              <td>₹ {row?.eventFee}</td>
              <td>{row.liftingPeriod}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {catelogueInformation?.auctionProperty?.map((item) => (
        <React.Fragment key={item?._id}>
          <ReactTooltip
            id={`tooltip-${item?._id}/location`}
            place="top"
            content={
              <p style={{ width: "200px" }}>
                {item?.location?.address || "..."}
              </p>
            }
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default AuctionPropertyTable;
