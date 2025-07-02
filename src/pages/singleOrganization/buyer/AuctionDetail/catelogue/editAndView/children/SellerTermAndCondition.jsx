import React from "react";

function SellerTermAndCondition({
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
          name="sellerTermsAndCondition"
          value={catelogueInformation?.sellerTermsAndCondition}
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
          {catelogueInformation?.sellerTermsAndCondition}
        </p>
      )}
    </div>
  );
}

export default SellerTermAndCondition;
