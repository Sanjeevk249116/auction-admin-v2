import React from 'react'
import ServiceLotTable from '../table/ServiceLotTable'
import HeaderPrototype from '../../../confirmCatelogue/downloadPdf/prototype/HeaderPrototype'

function ServiceLotHeader({reverseCatalogueInformation}) {
  return (
   <HeaderPrototype
        lable={"Service Lot Table"}
        childrens={
          <ServiceLotTable reverseCatalogueInformation={reverseCatalogueInformation} />
        }
      />
  )
}

export default ServiceLotHeader
