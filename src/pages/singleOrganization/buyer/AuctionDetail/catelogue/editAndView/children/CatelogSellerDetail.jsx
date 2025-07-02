import React from "react";

function CatelogSellerDetail({
  editValue,
  catelogueInformation,
  setCatelogueInformation,
}) {
  const handleChangeText = (e) => {
    const { value, name } = e.target;
    setCatelogueInformation((pre) => ({
      ...pre,
      sellerInformation: {
        ...pre.sellerInformation,
        [name]: value,
      },
    }));
  };

  return (
    <div className="flex column gap-1">
      <span className="flex column" style={{ gap: "0.5rem" }}>
        <h5>Name of the company</h5>
        {editValue ? (
          <p className="font-16px">
            {catelogueInformation?.sellerInformation?.companyName}
          </p>
        ) : (
          <input
            type="text"
            name="companyName"
            value={catelogueInformation?.sellerInformation?.companyName}
            className={`input-tag-style input-width`}
            required
            onChange={handleChangeText}
          />
        )}
      </span>
      <span className="flex column" style={{ gap: "0.5rem" }}>
        <h5>Address</h5>
        {editValue ? (
          <p className="font-16px">
            {catelogueInformation?.sellerInformation?.companyAddress}
          </p>
        ) : (
          <input
            type="text"
            name="companyAddress"
            value={catelogueInformation?.sellerInformation?.companyAddress}
            className={`input-tag-style input-width`}
            required
            onChange={handleChangeText}
          />
        )}
      </span>
    </div>
  );
}

export default CatelogSellerDetail;
