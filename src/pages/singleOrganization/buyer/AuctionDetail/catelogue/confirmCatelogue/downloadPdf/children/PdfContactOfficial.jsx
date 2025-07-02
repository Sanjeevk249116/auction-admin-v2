import React from "react";
import HeaderPrototype from "../prototype/HeaderPrototype";
import PdfContactPersonTable from "../table/PdfContactPersonTable";

function PdfContactOfficial({ catelogueInformation }) {
  return (

      <HeaderPrototype
        lable={"Contact official's at Cerclex Pvt. Ltd"}
        childrens={
          <PdfContactPersonTable catelogueInformation={catelogueInformation} />
        }
      />
 
  );
}

export default PdfContactOfficial;
