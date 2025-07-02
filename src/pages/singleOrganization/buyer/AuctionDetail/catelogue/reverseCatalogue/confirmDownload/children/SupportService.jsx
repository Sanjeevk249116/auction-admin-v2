import React from "react";
import SupportServiceDetails from "../subChild/SupportServiceDetails";
import HeaderPrototype from "../../../confirmCatelogue/downloadPdf/prototype/HeaderPrototype";

function SupportService({ reverseCatalogueInformation }) {
  return (
    <HeaderPrototype
      lable={
        "Online auction platform and support services provided by Infinite Cercle Private limited"
      }
      childrens={
        <SupportServiceDetails
          reverseCatalogueInformation={reverseCatalogueInformation}
        />
      }
    />
  );
}

export default SupportService;
