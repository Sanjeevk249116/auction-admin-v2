import React, { useState } from "react";
import CommanHeader from "./CommanHeader";
import HeaderFrame from "../prototype/HeaderFrame";
import OnlineTermAndCondition from "../children/OnlineTermAndCondition";

function OnlineAuctionCondition({
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
          label="TERMS & CONDITIONS OF THE ONLINE AUCTION"
          checkedBoxToggle={"onlineAuctionCheckbox"}
          onUpdate={() => handleUpdate()}
          editValue={updateItems}
          itemOpens={itemOpens}
        />
      }
      childrenSecond={
        <OnlineTermAndCondition
          editValue={updateItems}
          setCatelogueInformation={setCatelogueInformation}
          catelogueInformation={catelogueInformation}
        />
      }
    />
  );
}

export default OnlineAuctionCondition;
