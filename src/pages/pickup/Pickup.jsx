import React from "react";
import PickUpAnalystics from "./components/PickUpAnalystics";
import PickupTable from "./table/PickupTable";

function Pickup() {
  return (
    <div className="mt-1">
      <h4>PickUp Detail</h4>
      {/* <PickUpAnalystics /> */}
      <PickupTable />
    </div>
  );
}

export default Pickup;
