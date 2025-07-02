import React from "react";
import { useMediaQuery } from "react-responsive";
import InputFieldForLots from "./InputFieldForLots";

function ProductLotTax({ createOffer, setCreateOffer }) {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div
      className={`${isMobile ? "gap-1" : "gap-2"}`}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(1,1fr)" : "repeat(2,1fr)",
        gap: "20px",
      }}
    >
      {/* <span style={{ marginRight: "1.5rem" }}>
        <InputFieldForLots
          label={"Lifting Period"}
          name={"liftingPeriod"}
          type={"number"}
          placeholder={"Enter Lifting Period"}
          value={createOffer.liftingPeriod}
          setCreateOffer={setCreateOffer}
        />
      </span> */}

      <span style={{ marginRight: "1.5rem" }}>
        <InputFieldForLots
          label={"Taxes(IT-TCS) %"}
          name={"ItTCSTaxes"}
          type={"number"}
          placeholder={"Enter Taxes(IT-TCS)"}
          value={createOffer.ItTCSTaxes}
          setCreateOffer={setCreateOffer}
        />
      </span>
      <InputFieldForLots
        label={"GST %"}
        name={"GSTTaxes"}
        type={"number"}
        placeholder={"Enter GST"}
        value={createOffer.GSTTaxes}
        setCreateOffer={setCreateOffer}
      />
    </div>
  );
}

export default ProductLotTax;
