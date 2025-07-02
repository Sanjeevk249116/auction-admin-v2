import React from "react";
import RerederInfoDetail from "../children/RerederInfoDetail";
import { capitalizeFirstLetter } from "../../../../helper/helpers";
import { useMediaQuery } from "react-responsive";

function AccountInfoDashboard({ auctionInformation }) {
  const isTablet = useMediaQuery({ query: "(max-width: 750px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
  return (
    <div
      className="cover mt-1 white p-2 z-depth-1 text-center"
      style={{
        display: "grid",
        gridTemplateColumns:isMobile?"repeat(1,1fr)":isTablet?"repeat(2,1fr)": "repeat(4,1fr)",
        gap: "40px",
        placeItems: "center",
      }}
    >
      <RerederInfoDetail
        label={"Organization Name"}
        value={auctionInformation?.organizationName}
      />
      <RerederInfoDetail
        label={"Owner Name"}
        value={capitalizeFirstLetter(auctionInformation?.owner?.name)||"N/A"}
      />

      <RerederInfoDetail
        label={"Account Status"}
        value={auctionInformation?.verified ? "Verified" : "Pending"}
      />
      <RerederInfoDetail
        label={"Plan Name"}
        value={capitalizeFirstLetter(
          auctionInformation?.subscriptionPlan?.planName
        )}
      />
      <RerederInfoDetail
        label={"Email Id"}
        value={auctionInformation?.owner?.email || "N/A"}
      />
      <RerederInfoDetail
        label={"Phone Number"}
        value={auctionInformation?.owner?.phoneNumber || "N/A"}
      />
      <RerederInfoDetail
        label={"Plan Price"}
        value={auctionInformation?.subscriptionPlan?.planPrice}
      />
      <RerederInfoDetail
        label={"Location"}
        value={
          `${auctionInformation?.location?.address||"N/A"} ` ||
          "N/A"
        }
      />
    </div>
  );
}

export default AccountInfoDashboard;
