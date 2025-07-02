import React from "react";
import StyleCatelogue from "../prototype/StyleCatelogue";
import EmdInputAndText from "../prototype/EmdInputAndText";
import EmdText from "../prototype/EmdText";
import { useMediaQuery } from "react-responsive";

function EmdScheduleProgramme({
  editValue,
  catelogueInformation,
  setCatelogueInformation,

}) {
  const isTablet = useMediaQuery({ query: "(max-width: 500px)" });
  return (
    <div>
      <StyleCatelogue>
        <h6 className={`grey lighten-3 cercle-purple-text p-1 ${isTablet?"font-14px":"font-16px"} font font-500`}>
          Mode of EMD Payment (Refer Clause IV - Participation)
        </h6>
        <h6 className={`grey lighten-3 cercle-purple-text p-1 ${isTablet?"font-14px":"font-16px"} font font-500`}>
          SmartPay / EMD With Client
        </h6>
        {catelogueInformation?.auctionInformation?.map((item) => (
          <React.Fragment key={item.id}>
            <EmdInputAndText
              label={item.label}
              editValue={editValue}
              value={item.value}
              setCatelogueInformation={setCatelogueInformation}
            />
            {editValue ? (
              <EmdText label={item.value} />
            ) : (
              <EmdInputAndText
                label={item.label}
                edit={true}
                value={item.value}
                setCatelogueInformation={setCatelogueInformation}
              />
            )}
          </React.Fragment>
        ))}
      </StyleCatelogue>
    </div>
  );
}

export default EmdScheduleProgramme;
