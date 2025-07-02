import React from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import { capitalizeFirstLetter } from "../../../helper/helpers";

function ProfileHeader({ loadings, profile }) {
  const isMobile = useMediaQuery({ query: "(max-width:730px)" });

  return (
    <div
      className={`mt-1 p-1 white mb-1 cover valign-wrapper  flex-wrap ${
        isMobile ? " justify-center gap-1" : "space-between"
      }`}
    >
      <div
        className={` valign-wrapper flex-wrap gap-1 ${
          isMobile ? " justify-center" : ""
        } `}
      >
        {loadings ? (
          <Skeleton width={200} height={200} />
        ) : (
          <span className="p-1 circle border-dashed-style">
            <img
              style={{ objectFit: "cover" }}
              className="materialboxed circle"
              width="120px"
              height="120px"
             src="/images/user.png"
              alt="profileImg"
            />
          </span>
        )}

        <div className={`grey-text ${isMobile ? "text-center" : ""}`}>
          <h3 className="black-text margin-0px">
            {"Cerclex" || (
              <Skeleton width={120} />
            )}
          </h3>
          <p className="title bolder">
            Name:{" "}
            {capitalizeFirstLetter(profile?.name) || <Skeleton width={150} />}
          </p>
          <p className="title bolder">
            Email: {profile?.email || <Skeleton width={220} />}
          </p>
        </div>
      </div>
      {/* <SubscriptionPaymentDetails /> */}
    </div>
  );
}
export default ProfileHeader;
