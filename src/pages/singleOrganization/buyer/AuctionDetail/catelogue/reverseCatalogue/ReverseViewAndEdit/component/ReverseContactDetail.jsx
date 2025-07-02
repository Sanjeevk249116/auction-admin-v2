import React, { useState } from "react";
import HeaderFrame from "../../../editAndView/prototype/HeaderFrame";
import CommanHeader from "../../../editAndView/components/CommanHeader";
import ContactOfficial from "../../../editAndView/children/ContactOfficial";

function ReverseContactDetail({
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
      contactDetails: { ...pre.contactDetails, [name]: value },
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
          label="Contact details"
          checkedBoxToggle={"contactDetailsCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <div className="flex column gap-1 mb-1" style={{ width: "99%" }}>
          <h5>Contact Details</h5>
          <div className="grid-2 mb-1">
            <span
              style={{
                border: "1px solid grey",
                height: updateItems && "152px",
              }}
            >
              {!updateItems ? (
                <p style={{ padding: "10px", whiteSpace: "pre-wrap" }}>
                  {
                    reverseCatalogueInformation?.contactDetails
                      ?.buyerContactDetails
                  }
                </p>
              ) : (
                <textarea
                  className="border-radius-12"
                  rows="10"
                  name="buyerContactDetails"
                  placeholder="Buyer Contact Details"
                  value={
                    reverseCatalogueInformation?.contactDetails
                      ?.buyerContactDetails
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
                  {
                    reverseCatalogueInformation?.contactDetails
                      ?.cerclexContactDetails
                  }
                </p>
              ) : (
                <textarea
                  className="border-radius-12"
                  name="cerclexContactDetails"
                  placeholder="Cerclex Contact Details"
                  rows="10"
                  value={
                    reverseCatalogueInformation?.contactDetails
                      ?.cerclexContactDetails
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
            <ContactOfficial
            updateItems={updateItems}
            catelogueInformation={reverseCatalogueInformation}
            setCatelogueInformation={setReverseCatalogueInformation}
          />
        </div>
      }
    />
  );
}

export default ReverseContactDetail;
