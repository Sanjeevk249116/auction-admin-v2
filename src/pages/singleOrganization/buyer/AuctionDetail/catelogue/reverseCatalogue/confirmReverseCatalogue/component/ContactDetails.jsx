import React from 'react'

function ContactDetails({ reverseCatalogueInformation }) {
    return (
        <div>
            <h5>Contact Details</h5>
            <div className="grid-2 mt-1" style={{ textAlign: "left" }}>
                <p>{reverseCatalogueInformation?.contactDetails?.buyerContactDetails}</p>
                <p>{reverseCatalogueInformation?.contactDetails?.cerclexContactDetails}</p>
            </div>
        </div>
    )
}

export default ContactDetails
