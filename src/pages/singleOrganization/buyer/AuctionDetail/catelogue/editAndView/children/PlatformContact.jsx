import React from "react";

function PlatformContact({
  updateItems,
  setCatelogueInformation,
  catelogueInformation,
}) {
  const handleTextChange = (e) => {
    const { value, name } = e.target;
    setCatelogueInformation((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div className="flex column gap-10px">
      <h5>Contact Details</h5>
      {!updateItems ? (
        <p>{catelogueInformation?.companyDetails}</p>
      ) : (
        <input
          type="text"
          value={catelogueInformation?.companyDetails}
          name="companyDetails"
          placeholder="Company name"
          className={`input-tag-style input-width`}
          required
          onChange={handleTextChange}
        />
      )}
      <div className="grid-2">
        <span
          style={{ border: "1px solid grey", height: updateItems && "152px" }}
        >
          {!updateItems ? (
            <p style={{ padding: "10px", whiteSpace: "pre-wrap" }}>
              {catelogueInformation?.registerOffice}
            </p>
          ) : (
            <textarea
              className="border-radius-12"
              rows="10"
              name="registerOffice"
              placeholder="Register Address"
              value={catelogueInformation.registerOffice}
              style={{
                border: "10px solid transparent",
                outline: "2px solid transparent",
                minHeight: "150px",
                backgroundColor: "#fafafa",
              }}
              onChange={handleTextChange}
            />
          )}
        </span>
        <span
          style={{ border: "1px solid grey", height: updateItems && "152px" }}
        >
          {!updateItems ? (
            <p style={{ padding: "10px", whiteSpace: "pre-wrap" }}>
              {catelogueInformation?.branchOffice}
            </p>
          ) : (
            <textarea
              className="border-radius-12"
              name="branchOffice"
              placeholder="Branch Address"
              rows="10"
              value={catelogueInformation.branchOffice}
              style={{
                border: "10px solid transparent",
                outline: "2px solid transparent",
                minHeight: "150px",
                backgroundColor: "#fafafa",
              }}
              onChange={handleTextChange}
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default PlatformContact;
