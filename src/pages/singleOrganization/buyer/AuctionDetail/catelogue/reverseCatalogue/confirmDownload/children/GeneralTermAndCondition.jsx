import React from 'react'
import HeaderPrototype from '../../../confirmCatelogue/downloadPdf/prototype/HeaderPrototype'
import { Text } from '@react-pdf/renderer'

function GeneralTermAndCondition({reverseCatalogueInformation}) {
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
            {reverseCatalogueInformation?.generalTermsAndCondition ||
              "Online Auction terms and condition information not available."}
          </Text>
        }
      />
  )
}

export default GeneralTermAndCondition
