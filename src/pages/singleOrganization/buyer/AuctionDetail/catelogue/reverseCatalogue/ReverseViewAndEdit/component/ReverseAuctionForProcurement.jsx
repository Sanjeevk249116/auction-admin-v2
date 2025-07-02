import React, { useState } from "react";
import HeaderFrame from "../../../editAndView/prototype/HeaderFrame";
import CommanHeader from "../../../editAndView/components/CommanHeader";
import EmdScheduleProgramme from "../../../editAndView/children/EmdScheduleProgramme";
import { useSelector } from "react-redux";

function ReverseAuctionForProcurement({
  itemOpens,
  id,
  setReverseCatalogueInformation,
  reverseCatalogueInformation,
}) {
  const [mouseOnSwitch, setMouseOnSwitch] = useState(false);
  const [updateItems, setUpdateItems] = useState(true);
  const { singleAuctionData } = useSelector((state) => state.singleAuction);
  const handleUpdate = () => {
    setUpdateItems((prev) => !prev);
  };

  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setReverseCatalogueInformation((pre) => ({
      ...pre,
      procurementOfHiring: { ...pre.procurementOfHiring, [name]: value },
    }));
  };

  return (
    <HeaderFrame
      id={id}
      mouseOnSwitch={mouseOnSwitch}
      itemOpens={itemOpens}
      childrenFirst={
        <CommanHeader
          hoverByMouse={setMouseOnSwitch}
          label="Auction Information"
          checkedBoxToggle={"procurementCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <div className="flex column gap-1 mb-1" style={{ width: "99%" }}>
          <h5>
            {`Online – reverse auction for ${
              singleAuctionData?.auctionType === "reverseAuctionService"
                ? singleAuctionData?.serviceName
                : singleAuctionData?.description
            }`}
          </h5>
          {!updateItems ? (
            <p>
              {reverseCatalogueInformation?.procurementOfHiring?.declaration}
            </p>
          ) : (
            <input
              type="text"
              value={
                reverseCatalogueInformation?.procurementOfHiring?.declaration
              }
              name="declaration"
              placeholder="Declaration"
              className={`input-tag-style input-width`}
              required
              onChange={handleTextChange}
            />
          )}
          {updateItems ? (
            <textarea
              className="border-radius-12"
              name="serviceInformation"
              rows="10"
              value={
                reverseCatalogueInformation?.procurementOfHiring
                  ?.serviceInformation
              }
              style={{
                border: "10px solid transparent",
                outline: "2px solid transparent",
                minHeight: "150px",
                backgroundColor: "#fafafa",
              }}
              onChange={handleTextChange}
            />
          ) : (
            <p style={{ whiteSpace: "pre-wrap" }}>
              {
                reverseCatalogueInformation?.procurementOfHiring
                  ?.serviceInformation
              }
            </p>
          )}
          <h5>Schedule Of Programme</h5>
          <EmdScheduleProgramme
            editValue={!updateItems}
            setCatelogueInformation={setReverseCatalogueInformation}
            catelogueInformation={reverseCatalogueInformation}
          />
          <p className="mt-1">
            The General Terms & Conditions annexed herewith shall be read
            together and are complementary to each other.
          </p>
        </div>
      }
    />
  );
}

export default ReverseAuctionForProcurement;
