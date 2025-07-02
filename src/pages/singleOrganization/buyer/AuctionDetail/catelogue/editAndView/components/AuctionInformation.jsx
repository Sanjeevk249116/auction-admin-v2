import React, { useState } from "react";
import CommanHeader from "./CommanHeader";
import EmdScheduleProgramme from "../children/EmdScheduleProgramme";
import HeaderFrame from "../prototype/HeaderFrame";

function AuctionInformation({
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

  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setCatelogueInformation((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <HeaderFrame
      id={id}
      mouseOnSwitch={mouseOnSwitch}
      itemOpens={itemOpens}
      childrenFirst={
        <CommanHeader
          hoverByMouse={setMouseOnSwitch}
          label="Auction information"
          checkedBoxToggle={"auctionCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <div className="flex column gap-2 mb-1" style={{ width: "99%" }}>
          <span className="flex column gap-1">
            <h5>
              Online auction platform and support services provided by CercleX
            </h5>
            {updateItems ? (
              <textarea
                className="border-radius-12"
                name="auctionSupportServices"
                rows="10"
                value={catelogueInformation.auctionSupportServices}
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
                {catelogueInformation?.auctionSupportServices}
              </p>
            )}
          </span>
          <span className="flex column gap-1">
            <h5>Schedule Of Programme</h5>
            <EmdScheduleProgramme
              editValue={!updateItems}
              setCatelogueInformation={setCatelogueInformation}
              catelogueInformation={catelogueInformation}
            />
          </span>
        </div>
      }
    />
  );
}

export default AuctionInformation;
