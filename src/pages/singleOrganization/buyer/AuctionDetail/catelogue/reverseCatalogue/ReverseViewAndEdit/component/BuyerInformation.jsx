import React, { useState } from "react";
import HeaderFrame from "../../../editAndView/prototype/HeaderFrame";
import CommanHeader from "../../../editAndView/components/CommanHeader";
import CatalogueBuyerDetail from "../children/CatalogueBuyerDetail";


function BuyerInformation({
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

  return (
    <HeaderFrame
      id={id}
      mouseOnSwitch={mouseOnSwitch}
      itemOpens={itemOpens}
      childrenFirst={
        <CommanHeader
          hoverByMouse={setMouseOnSwitch}
          label="Buyer information"
          checkedBoxToggle={"buyerCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <CatalogueBuyerDetail
          editValue={!updateItems}
          setReverseCatalogueInformation={setReverseCatalogueInformation}
          reverseCatalogueInformation={reverseCatalogueInformation}
        />
      }
    />
  );
}

export default BuyerInformation;
