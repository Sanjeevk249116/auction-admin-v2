import React from "react";

function CatalogueBuyerDetail({
  editValue,
  reverseCatalogueInformation,
  setReverseCatalogueInformation,
}) {
  const handleChangeText = (e) => {
    const { value, name } = e.target;
    setReverseCatalogueInformation((pre) => ({
      ...pre,
      buyerDetails: {
        ...pre.buyerDetails,
        [name]: value,
      },
    }));
  };

  return (
    <div className="flex column gap-1">
      <span className="flex column" style={{ gap: "0.5rem" }}>
        <h5>Name of the buyer company name</h5>
        {editValue ? (
          <p className="font-16px">
            {reverseCatalogueInformation?.buyerDetails?.buyerName}
          </p>
        ) : (
          <input
            type="text"
            name="buyerName"
            value={reverseCatalogueInformation?.buyerDetails?.buyerName}
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
            {reverseCatalogueInformation?.buyerDetails?.buyerAddress}
          </p>
        ) : (
          <input
            type="text"
            name="buyerAddress"
            value={reverseCatalogueInformation?.buyerDetails?.buyerAddress}
            className={`input-tag-style input-width`}
            required
            onChange={handleChangeText}
          />
        )}
      </span>
    </div>
  );
}

export default CatalogueBuyerDetail;
