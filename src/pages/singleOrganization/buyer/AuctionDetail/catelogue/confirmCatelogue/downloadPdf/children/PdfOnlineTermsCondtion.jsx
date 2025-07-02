import React from "react";
import HeaderPrototype from "../prototype/HeaderPrototype";
import { Text } from "@react-pdf/renderer";

function PdfOnlineTermsCondtion({ catelogueInformation }) {
  return (

      <HeaderPrototype
        lable={"TERMS & CONDITIONS OF THE ONLINE AUCTION"}
        childrens={
          <Text
            style={{
              whiteSpace: "pre-wrap",
              textAlign: "left",
              fontSize: 11,
              marginVertical: 8,
            }}
          >
            {catelogueInformation?.onlineAuctionCondition ||
              "Online Auction terms and condition information not available."}
          </Text>
        }
      />

  );
}

export default PdfOnlineTermsCondtion;
