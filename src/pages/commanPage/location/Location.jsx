import React from "react";
import AddLocation from "./AddLocation";
function Location({values,setValues,locationName=false}) {

  return (
    <div>
      <AddLocation values={values} setValues={setValues} locationName={locationName}/>
    </div>
  );
}

export default Location;
