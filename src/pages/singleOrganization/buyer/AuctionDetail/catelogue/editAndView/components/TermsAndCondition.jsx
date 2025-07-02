import React, { useState } from "react";
import CommanHeader from "./CommanHeader";
import HeaderFrame from "../prototype/HeaderFrame";
import SellerTermAndCondition from "../children/SellerTermAndCondition";

function TermsAndCondition({
  itemOpens,
  id,
  setCatelogueInformation,
  catelogueInformation,
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
          label="SELLER TERMS & CONDITIONS "
          checkedBoxToggle={"termsCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <SellerTermAndCondition
          editValue={updateItems}
          setCatelogueInformation={setCatelogueInformation}
          catelogueInformation={catelogueInformation}
        />
      }
    />
  );
}

export default TermsAndCondition;
