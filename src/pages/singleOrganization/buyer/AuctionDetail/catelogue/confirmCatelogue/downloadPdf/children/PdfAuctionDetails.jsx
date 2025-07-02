import React from "react";
import HeaderPrototype from "../prototype/HeaderPrototype";
import PdfCatalogueTable from "../table/PdfCatalogueTable";

function PdfAuctionDetails({ catelogueInformation }) {
  return (

      <HeaderPrototype
        lable={"SCHEDULE OF PROGRAMME"}
        childrens={
          <PdfCatalogueTable catelogueInformation={catelogueInformation} />
        }
      />
   
  );
}

export default PdfAuctionDetails;
