import React from 'react'

function ServiceSupportDetail({ reverseCatalogueInformation }) {
    return (
        <div>
            <h5>Location Details</h5>
            <div className="grid-2 mt-1" style={{ textAlign: "left" }}>
                <p>{reverseCatalogueInformation?.supportService?.registerAddress}</p>
                <p>{reverseCatalogueInformation?.supportService?.branchAddress}</p>
            </div>
        </div>
    )
}

export default ServiceSupportDetail
