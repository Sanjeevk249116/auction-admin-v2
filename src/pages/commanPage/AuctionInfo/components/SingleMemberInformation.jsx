import React from "react";
import RerederInfoDetail from "../../../dashboard/comman/children/RerederInfoDetail";
import { handleDateSetUp } from "../../../../helper/helpers";


function SingleMemberInformation({ singleMemberData }) {
  return (
    <div
      className="cover mt-1 white p-2 z-depth-1 text-center"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "40px",
        placeItems: "center",
      }}
    >
      <RerederInfoDetail label={"Member Id"} value={singleMemberData?.id} />
      <RerederInfoDetail label={"Name"} value={singleMemberData?.name} />
      <RerederInfoDetail
        label={"Organization name"}
        value={singleMemberData?.organization}
      />
      <RerederInfoDetail label={"Role"} value={singleMemberData?.role} />
      <RerederInfoDetail label={"Email"} value={singleMemberData?.email} />
      <RerederInfoDetail label={"Phone"} value={singleMemberData?.phone} />
      <RerederInfoDetail
        label={"Date of Registration"}
        value={handleDateSetUp(singleMemberData?.joinedDate)}
      />
      <RerederInfoDetail
        label={"Account Status"}
        value={singleMemberData?.accountStatus}
      />
    </div>
  );
}

export default SingleMemberInformation;
