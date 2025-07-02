import React from "react";
import HeaderPrototype from "../prototype/HeaderPrototype";
import PdfContactInfo from "../subChildren/PdfContactInfo";

function PdfContactDetail({ catelogueInformation }) {
  return (
    <HeaderPrototype
      lable={"Contact Details"}
      childrens={<PdfContactInfo catelogueInformation={catelogueInformation} />}
    />
  );
}

export default PdfContactDetail;
