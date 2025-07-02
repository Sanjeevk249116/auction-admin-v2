import React from "react";
import HeaderPrototype from "../prototype/HeaderPrototype";
import PdfAuctionPropertyTable from "../table/PdfAuctionPropertyTable";

function PdfAuctionProperties({ catelogueInformation }) {
  return (
      <HeaderPrototype
        lable={" DETAILS OF AUCTION PROPERTY"}
        childrens={
          <PdfAuctionPropertyTable
            catelogueInformation={catelogueInformation}
          />
        }
      />
  );
}

export default PdfAuctionProperties;
