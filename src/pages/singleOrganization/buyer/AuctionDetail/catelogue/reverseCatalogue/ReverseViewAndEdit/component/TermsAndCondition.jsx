import React, { useState } from "react";
import HeaderFrame from "../../../editAndView/prototype/HeaderFrame";
import CommanHeader from "../../../editAndView/components/CommanHeader";
import TermsAndConditionField from "../children/TermsAndConditionField";


function TermsAndCondition({
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
          label="TERMS & CONDITIONS "
          checkedBoxToggle={"termsCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <TermsAndConditionField
          editValue={updateItems}
          setCatelogueInformation={setReverseCatalogueInformation}
          catelogueInformation={reverseCatalogueInformation}
        />
      }
    />
  );
}

export default TermsAndCondition;
