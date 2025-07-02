import React, { useState } from "react";
import CommanHeader from "./CommanHeader";
import CatelogSellerDetail from "../children/CatelogSellerDetail";
import HeaderFrame from "../prototype/HeaderFrame";

function SellerInformation({
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

  return (
    <HeaderFrame
      id={id}
      mouseOnSwitch={mouseOnSwitch}
      itemOpens={itemOpens}
      childrenFirst={
        <CommanHeader
          hoverByMouse={setMouseOnSwitch}
          label="Seller information"
          checkedBoxToggle={"sellerCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <CatelogSellerDetail
          editValue={!updateItems}
          setCatelogueInformation={setCatelogueInformation}
          catelogueInformation={catelogueInformation}
        />
      }
    />
  );
}

export default SellerInformation;
