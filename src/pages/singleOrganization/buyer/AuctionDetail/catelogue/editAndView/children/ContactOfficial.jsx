import React from "react";
import EditContainDetailsTable from "../table/EditContainDetailsTable";

function ContactOfficial({
  updateItems,
  catelogueInformation,
  setCatelogueInformation,
}) {


  return (
    <div className="flex column gap-10px">
      <h5> Contact officials at Cerclex Pvt. Ltd</h5>
      <EditContainDetailsTable
        updateItems={updateItems}
        catelogueInformation={catelogueInformation}
        setCatelogueInformation={setCatelogueInformation}
      />
    </div>
  );
}

export default ContactOfficial;
