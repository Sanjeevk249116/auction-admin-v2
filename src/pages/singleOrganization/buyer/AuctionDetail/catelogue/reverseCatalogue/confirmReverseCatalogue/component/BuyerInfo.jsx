import React from "react";

function BuyerInfo({ reverseCatalogueInformation }) {
  return (
    <>
      <div className="flex justify-center ">
        <img
          src="/images/auction-image.png"
          alt="logo"
          className="auction-logo"
        />
      </div>
      <div
        className=" flex column cover p-1 "
        style={{ backgroundColor: "#F8F8F8", gap: "10px" }}
      >
        <h5 className="margin-0px font-16px">
          {reverseCatalogueInformation?.buyerDetails?.buyerName}
        </h5>
        <p className="font-15px">
          {reverseCatalogueInformation?.buyerDetails?.buyerAddress}
        </p>
      </div>
    </>
  );
}

export default BuyerInfo;
