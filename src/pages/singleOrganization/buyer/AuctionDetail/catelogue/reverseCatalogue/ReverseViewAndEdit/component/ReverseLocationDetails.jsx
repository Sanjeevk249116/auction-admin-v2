import React, { useState } from "react";
import HeaderFrame from "../../../editAndView/prototype/HeaderFrame";
import CommanHeader from "../../../editAndView/components/CommanHeader";

function ReverseLocationDetails({
  itemOpens,
  id,
  setReverseCatalogueInformation,
  reverseCatalogueInformation,
}) {
  const [mouseOnSwitch, setMouseOnSwitch] = useState(false);
  const [updateItems, setUpdateItems] = useState(true);

  const handleUpdate = () => {
    setUpdateItems((prev) => !prev);
  };

  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setReverseCatalogueInformation((pre) => ({
      ...pre,
      supportService: { ...pre.supportService, [name]: value },
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
          label="Location Details"
          checkedBoxToggle={"auctionCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <div className="flex column gap-1 mb-1" style={{ width: "99%" }}>
          <h5>
            Online auction platform and support services provided by Infinite
            Cercle Private limited
          </h5>
          <div className="grid-2">
            <span
              style={{
                border: "1px solid grey",
                height: updateItems && "152px",
              }}
            >
              {!updateItems ? (
                <p style={{ padding: "10px", whiteSpace: "pre-wrap" }}>
                  {reverseCatalogueInformation?.supportService?.registerAddress}
                </p>
              ) : (
                <textarea
                  className="border-radius-12"
                  rows="10"
                  name="registerAddress"
                  placeholder="Register Address"
                  value={
                    reverseCatalogueInformation?.supportService?.registerAddress
                  }
                  style={{
                    border: "10px solid transparent",
                    outline: "2px solid transparent",
                    minHeight: "150px",
                    backgroundColor: "#fafafa",
                  }}
                  onChange={handleTextChange}
                />
              )}
            </span>
            <span
              style={{
                border: "1px solid grey",
                height: updateItems && "152px",
              }}
            >
              {!updateItems ? (
                <p style={{ padding: "10px", whiteSpace: "pre-wrap" }}>
                  {reverseCatalogueInformation?.supportService?.branchAddress}
                </p>
              ) : (
                <textarea
                  className="border-radius-12"
                  name="branchAddress"
                  placeholder="Branch Address"
                  rows="10"
                  value={
                    reverseCatalogueInformation?.supportService?.branchAddress
                  }
                  style={{
                    border: "10px solid transparent",
                    outline: "2px solid transparent",
                    minHeight: "150px",
                    backgroundColor: "#fafafa",
                  }}
                  onChange={handleTextChange}
                />
              )}
            </span>
          </div>
        </div>
      }
    />
  );
}

export default ReverseLocationDetails;
