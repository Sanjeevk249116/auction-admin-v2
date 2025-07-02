import React from "react";
import { Text } from "@react-pdf/renderer";
import HeaderPrototype from "../prototype/HeaderPrototype";

function PdfMemberships({ catelogueInformation }) {
  return (
    <HeaderPrototype
      lable={"Membership Details"}
      childrens={
        <Text
          style={{
            whiteSpace: "pre-wrap",
            textAlign: "left",
            fontSize: 11,
            marginVertical: 8,
          }}
        >
          {catelogueInformation?.membershipDetails ||
            "Membership information not available."}
        </Text>
      }
    />
  );
}

export default PdfMemberships;
