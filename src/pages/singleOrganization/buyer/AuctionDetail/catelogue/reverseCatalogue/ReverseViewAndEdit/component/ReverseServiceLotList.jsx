import React, { useState } from "react";

import HeaderFrame from "../../../editAndView/prototype/HeaderFrame";
import CommanHeader from "../../../editAndView/components/CommanHeader";

import ReverseServiceLotTable from "../table/ReverseServiceLotTable";

function ReverseServiceLotList({
  itemOpens,
  id,
  reverseCatalogueInformation,
  setReverseCatalogueInformation,
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
          label="DETAILS OF AUCTION PROPERTY"
          checkedBoxToggle={"propertyCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <div>
          <h6 className="font-18px">Details of Auction Property </h6>
          <ReverseServiceLotTable
            editValue={updateItems}
            setCatelogueInformation={setReverseCatalogueInformation}
            catelogueInformation={reverseCatalogueInformation}
          />
        </div>
      }
    />
  );
}

export default ReverseServiceLotList;
