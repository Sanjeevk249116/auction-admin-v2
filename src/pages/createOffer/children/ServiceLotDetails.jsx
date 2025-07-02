import React from "react";
import { useMediaQuery } from "react-responsive";
import InputFieldForLots from "./InputFieldForLots";

function ServiceLotDetails({ createOffer, setCreateOffer }) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  return (
    <div className="flex column" style={{ gap: "10px" }}>
      <h5 className="font-18px">Service Details</h5>
      <div
        className={`${isMobile ? "gap-1" : "gap-2"}`}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(1,1fr)" : "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        <span style={{ marginRight: "1.5rem" }}>
          <InputFieldForLots
            label={"Title"}
            name={"title"}
            type={"text"}
            placeholder={"Enter Service Title"}
            value={createOffer.title}
            setCreateOffer={setCreateOffer}
          />
        </span>
        <span style={{ marginRight: "1.5rem" }}>
          <InputFieldForLots
            label={"Category"}
            name={"category"}
            type={"text"}
            placeholder={"Enter Category"}
            value={createOffer.category}
            setCreateOffer={setCreateOffer}
          />
        </span>
        <InputFieldForLots
          label={"Sub-category"}
          name={"subCategory"}
          type={"text"}
          placeholder={"Enter Sub-Category"}
          value={createOffer.subCategory}
          setCreateOffer={setCreateOffer}
        />
      </div>
    </div>
  );
}

export default ServiceLotDetails;
