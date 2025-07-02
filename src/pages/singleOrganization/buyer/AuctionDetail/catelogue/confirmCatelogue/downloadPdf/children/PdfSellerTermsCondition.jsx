import React from "react";
import HeaderPrototype from "../prototype/HeaderPrototype";
import { Text } from "@react-pdf/renderer";

function PdfSellerTermsCondition({ catelogueInformation }) {
  return (
    <HeaderPrototype
      lable={"SELLER TERMS & CONDITIONS"}
      childrens={
        <Text
          style={{
            whiteSpace: "pre-wrap",
            textAlign: "left",
            fontSize: 11,
            marginVertical: 8,
          }}
        >
          {catelogueInformation?.sellerTermsAndCondition || "Seller terms and condition information not available."}
        </Text>
      }
    />
  );
}

export default PdfSellerTermsCondition;
