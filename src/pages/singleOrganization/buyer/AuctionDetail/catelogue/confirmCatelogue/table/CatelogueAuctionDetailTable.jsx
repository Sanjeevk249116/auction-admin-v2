import React from "react";
import { useMediaQuery } from "react-responsive";

function CatelogueAuctionDetailTable({ catelogueInformation }) {
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div className="table-container-style">
      <table
        className={`responsive-table centered ${
          isTablet ? "auction_table table-style" : "custom-table-style catelogTable"
        } `}
      >
        <thead>
          <tr>
            <th>Mode of EMD Payment (Refer Clause IV - Participation)</th>
            <th>SmartPay / EMD With Client</th>
          </tr>
        </thead>
        <tbody>
          {catelogueInformation?.auctionInformation?.map((item) => (
            <tr key={item.id}>
              <td>{item.label}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CatelogueAuctionDetailTable;
