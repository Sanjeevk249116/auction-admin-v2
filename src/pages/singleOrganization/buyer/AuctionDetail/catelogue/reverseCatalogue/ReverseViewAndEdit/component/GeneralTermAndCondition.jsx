import React, { useState } from "react";
import HeaderFrame from "../../../editAndView/prototype/HeaderFrame";
import CommanHeader from "../../../editAndView/components/CommanHeader";
import GeneralTemsAndConditionField from "../children/GeneralTemsAndConditionField";

function GeneralTermAndCondition({
  itemOpens,
  id,
  setReverseCatalogueInformation,
  reverseCatalogueInformation,
}) {
  const [mouseOnSwitch, setMouseOnSwitch] = useState(false);
  const [updateItems, setUpdateItems] = useState(true);

  const handleUpdate = (item) => {
    setUpdateItems((prev) => !prev);
  };

  return (
    <HeaderFrame
      id={id}
      mouseOnSwitch={mouseOnSwitch}
      itemOpens={itemOpens}
      childrenFirst={
        <CommanHeader
          hoverByMouse={setMouseOnSwitch}
          label="GENERAL TERMS & CONDITIONS"
          checkedBoxToggle={"generalTermsCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <GeneralTemsAndConditionField
          editValue={updateItems}
          setCatelogueInformation={setReverseCatalogueInformation}
          catelogueInformation={reverseCatalogueInformation}
        />
      }
    />
  );
}

export default GeneralTermAndCondition;
