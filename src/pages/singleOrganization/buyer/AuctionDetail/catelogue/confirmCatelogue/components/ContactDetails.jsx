import React from "react";

function ContactDetails({ catelogueInformation }) {
  return (
    <div>
      <h5>{catelogueInformation?.companyDetails}</h5>
      <div className="grid-2 mt-1" style={{textAlign:"left"}}>
        <p>{catelogueInformation?.registerOffice}</p>
        <p>{catelogueInformation?.branchOffice}</p>
      </div>
    </div>
  );
}

export default ContactDetails;
