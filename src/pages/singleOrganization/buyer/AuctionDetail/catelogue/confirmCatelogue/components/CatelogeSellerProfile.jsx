import React from "react";

function CatelogeSellerProfile({ catelogueInformation }) {
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
          {catelogueInformation?.sellerInformation?.companyName}
        </h5>
        <p className="font-15px">
          {catelogueInformation?.sellerInformation?.companyAddress}
        </p>
      </div>
      <p
        className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
        style={{ padding: "0.7rem" }}
      >
        CercleX online auction platform and support services.
      </p>
      <p
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
        }}
      >
        {catelogueInformation?.auctionSupportServices}
      </p>
    </>
  );
}

export default CatelogeSellerProfile;
