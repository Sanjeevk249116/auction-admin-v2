import React from 'react'
import StyleCatelogue from '../../../editAndView/prototype/StyleCatelogue';
import EmdInputAndText from '../../../editAndView/prototype/EmdInputAndText';
import EmdText from '../../../editAndView/prototype/EmdText';

function ReverseScheduleProgramme({ editValue, setReverseCatalogueInformation, reverseCatalogueInformation }) {

  return (
    <div>
      <StyleCatelogue>

        <EmdInputAndText
          label={"Online E-Negotiation Date and Time"}
          editValue={editValue}
          value={""}
          setCatelogueInformation={setReverseCatalogueInformation}
        />
        {editValue ? (
          <EmdText label={""} />
        ) : (
          <EmdInputAndText
            label={"Online E-Negotiation Date and Time"}
            edit={true}
            value={""}
            setCatelogueInformation={setReverseCatalogueInformation}
          />
        )}
      </StyleCatelogue>
    </div>
  );
}

export default ReverseScheduleProgramme
