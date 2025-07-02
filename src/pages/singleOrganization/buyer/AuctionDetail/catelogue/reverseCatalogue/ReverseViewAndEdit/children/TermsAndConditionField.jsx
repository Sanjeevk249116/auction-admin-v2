import React from "react";

function TermsAndConditionField({
  catelogueInformation,
  setCatelogueInformation,
  editValue,
}) {
  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setCatelogueInformation((pre) => ({ ...pre, [name]: value }));
  };
  return (
    <div>
      {editValue ? (
        <textarea
          className="terms-textarea"
          rows="30"
          name="termsAndCondition"
          value={catelogueInformation?.termsAndCondition}
          onChange={handleTextChange}
          style={{
            width: "100%",
            padding: "1rem",
            height: "10%",
            border: "1px solid #e0e0e0",
          }}
        />
      ) : (
        <p
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {catelogueInformation?.termsAndCondition}
        </p>
      )}
    </div>
  );
}

export default TermsAndConditionField;
