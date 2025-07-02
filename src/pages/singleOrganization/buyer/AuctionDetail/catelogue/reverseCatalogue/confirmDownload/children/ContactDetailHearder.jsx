import React from 'react'
import HeaderPrototype from '../../../confirmCatelogue/downloadPdf/prototype/HeaderPrototype'
import ContactDetails from '../subChild/ContactDetails'

function ContactDetailHearder({reverseCatalogueInformation}) {
  return (
    <HeaderPrototype
      lable={"Contact Details"}
      childrens={<ContactDetails reverseCatalogueInformation={reverseCatalogueInformation} />}
    />
  )
}

export default ContactDetailHearder
