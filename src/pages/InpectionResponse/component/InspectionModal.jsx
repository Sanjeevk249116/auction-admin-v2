import React from "react";
import {
  convertTo12HourFormat,
  handleDateSetUp,
} from "../../../helper/helpers";

function InspectionModal({ personalDetails }) {
  const {
    auction,
    inspectionBy,
    contactPerson,
    inspectionCompletedDate,
    inspectionLocation,
    response,
  } = personalDetails;

  return (
    <div className="flex column gap-1">
      <h4 className="flex justify-center font-cercular-bold cercle-purple-text margin-0px">
        Inspection Response Details
      </h4>
      <div className="border-1px">
        <InspectionPrototype label={"Auction ID"} values={auction?.auctionId} />
        <InspectionPrototype
          label={"Inspection Date"}
          values={handleDateSetUp(inspectionCompletedDate)}
        />
        <InspectionPrototype
          label={"EMD End Date & Time"}
          values={`${handleDateSetUp(
            auction?.EMDSchedule?.lastDate
          )} & ${convertTo12HourFormat(auction?.EMDSchedule?.lastTime)}`}
        />
        <InspectionPrototype label={"Inspected by"} values={inspectionBy} />
        <InspectionPrototype label={"Contact Person"} values={contactPerson} />
        <InspectionPrototype label={"Location"} values={inspectionLocation} />
      </div>
      <div className="mt-1">
        {response?.map((item, index) => (
          <div key={item._id} className="flex">
            <p className="valign-wrapper gap-1" style={{ marginBottom: "5px" }}>
              <span className="material-icons-outlined cercle-purple-text pointer">
                check
              </span>
              {item}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className={`button-style white-text cercle-purple mt-1 pointer modal-close`}
          style={{ padding: "8px 25px" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function InspectionPrototype({ label, values }) {
  return (
    <div className="valign-wrapper download-inspection-style pin-top">
      <p className="">{label}</p>
      <span className="verticalLine"></span>
      <p className="">{values}</p>
    </div>
  );
}
export default InspectionModal;
