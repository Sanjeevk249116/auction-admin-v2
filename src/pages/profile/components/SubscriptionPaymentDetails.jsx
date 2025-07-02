import React from "react";
import { format } from "date-fns";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import organization from "../../../jsonData/organization.json";

function SubscriptionPaymentDetails() {
  const isMobile = useMediaQuery({ query: "(max-width:600px)" });

  const formatDate = (dateString) => {
    if (!dateString) {
      return;
    }
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <div
      className={`subscription-card column ${
        isMobile ? "full-width valign-wrapper" : "flex"
      }`}
      style={{ gap: "4px" }}
    >
      <p className="plan-name font-18px">
        Plan Name:{" "}
        <span className="font-16px">
          {" "}
          {organization?.subscriptionPlan?.planName}
        </span>
      </p>
      <div
        className={`valign-wrapper ${
          isMobile ? "column" : "space-between gap-3"
        }`}
      >
        <p className="font-16px">
          Plan Duration : {organization?.subscriptionPlan?.planDuration}{" "}
          {organization?.subscriptionPlan?.planPrice === 0 ? "Month" : "Year"}
        </p>
        <p className="font-16px">
          Price : ₹ {organization?.subscriptionPlan?.planPrice}
        </p>
      </div>
      <div
        className={`valign-wrapper ${
          isMobile ? "column" : "space-between gap-3"
        }`}
      >
        <div>
          <span>Started On : </span>
          <strong>
            {formatDate(organization?.subscriptionPlan?.startedOn)}
          </strong>
        </div>
        <div>
          <span>Expires On: </span>
          <strong>
            {formatDate(organization?.subscriptionPlan?.expiresOn)}
          </strong>
        </div>
      </div>
      <div className="flex justify-center mt-1">
        <Link to={"/subscription"}>
          <button className="renew-button pointer font-16px cercle-purple-text cover font-14px">
            Renew Subscription
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SubscriptionPaymentDetails;
