import React, { useState } from "react";
import CommanHeader from "./CommanHeader";
import HeaderFrame from "../prototype/HeaderFrame";
import PlatformContact from "../children/PlatformContact";
import ContactOfficial from "../children/ContactOfficial";

function PlatformAndContactDetails({
  itemOpens,
  id,
  setCatelogueInformation,
  catelogueInformation,
}) {
  const [mouseOnSwitch, setMouseOnSwitch] = useState(false);
  const [updateItems, setUpdateItems] = useState(true);

  const handleUpdate = () => {
    setUpdateItems((prev) => !prev);
  };

  // const handleTextChange = (e) => {
  //   const { value, name } = e.target;
  //   setCatelogueInformation((pre) => ({ ...pre, [name]: value }));
  // };

  return (
    <HeaderFrame
      id={id}
      mouseOnSwitch={mouseOnSwitch}
      itemOpens={itemOpens}
      childrenFirst={
        <CommanHeader
          hoverByMouse={setMouseOnSwitch}
          label="Platform Information & Contact details"
          checkedBoxToggle={"platformCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <div className="flex column gap-2 mb-1" style={{ width: "99%" }}>
          {/* <span className="flex column gap-10px">
            <h5>Membership Details</h5>
            {updateItems ? (
              <textarea
                className="border-radius-12"
                rows="10"
                name="membershipDetails"
                value={catelogueInformation.membershipDetails}
                style={{
                  border: "10px solid transparent",
                  outline: "2px solid transparent",
                  minHeight: "100px",
                  backgroundColor: "#fafafa",
                }}
                onChange={handleTextChange}
              />
            ) : (
              <p style={{ whiteSpace: "pre-wrap" }}>
                {catelogueInformation?.membershipDetails}
              </p>
            )}
          </span> */}
          <PlatformContact
            updateItems={updateItems}
            catelogueInformation={catelogueInformation}
            setCatelogueInformation={setCatelogueInformation}
          />
          <ContactOfficial
            updateItems={updateItems}
            catelogueInformation={catelogueInformation}
            setCatelogueInformation={setCatelogueInformation}
          />
        </div>
      }
    />
  );
}

export default PlatformAndContactDetails;
