import React from 'react'
import ReverseAuctionDetail from '../subChild/ReverseAuctionDetail'
import HeaderPrototype from '../../../confirmCatelogue/downloadPdf/prototype/HeaderPrototype';

function OnlineReverseAuction({ reverseCatalogueInformation }) {
 
    return (
        <HeaderPrototype
            lable={
                `ONLINE – REVERSE AUCTION FOR ${
              reverseCatalogueInformation?.auctionTypeStyle === "reverseAuctionService"
                ? reverseCatalogueInformation?.serviceName
                : reverseCatalogueInformation?.description
            }`
            }
            childrens={
                <ReverseAuctionDetail
                    reverseCatalogueInformation={reverseCatalogueInformation}
                />
            }
        />
    )
}

export default OnlineReverseAuction
