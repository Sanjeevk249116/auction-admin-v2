import React from 'react'
import HeaderPrototype from '../../../confirmCatelogue/downloadPdf/prototype/HeaderPrototype'
import ProductLotTable from '../table/ProductLotTable'

function ProductLotHeader({ reverseCatalogueInformation }) {
    return (
        <HeaderPrototype
            lable={"Product Lot Table"}
            childrens={
                <ProductLotTable reverseCatalogueInformation={reverseCatalogueInformation} />
            }
        />
    )
}

export default ProductLotHeader
