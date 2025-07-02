import React from 'react'
import HeaderPrototype from '../../../confirmCatelogue/downloadPdf/prototype/HeaderPrototype'
import { Text } from '@react-pdf/renderer'

function TermsAndConditionHeader({reverseCatalogueInformation}) {
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
          {reverseCatalogueInformation?.termsAndCondition || "Seller terms and condition information not available."}
        </Text>
      }
    />
  )
}

export default TermsAndConditionHeader
