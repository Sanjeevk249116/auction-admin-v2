import React, { useEffect } from "react";
import SubscriptionPlan from "./components/SubscriptionPlan";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscription } from "../../redux/action/subscription";
import SubscriptionLoader from "../commanPage/loader/SubscriptionLoader";

function SubcriptionPages() {
  const dispatch = useDispatch();
  const isLaptop = useMediaQuery({ query: "(max-width: 1300px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 800px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const { subscriptionLoading, subscriptionCollection } = useSelector(
    (state) => state.susbcription
  );

  useEffect(() => {
    dispatch(getAllSubscription());
  }, [dispatch]);

  return (
    <div className="mt-1">
      <div className="valign-wrapper space-between">
        <h4>Subscription</h4>
        <div className="valign-wrapper gap-1">
          <Link to={"/archive-subscription"}>
            <button
              className={`button-style pointer cercle-purple-text font-weight-600 font-18px font-cercular-bold`}
              style={{
                padding: "5px 20px",
                border: "1px solid #6f2da8",
              }}
            >
              Archive Plan
            </button>
          </Link>
          <Link to={"/create-subscription"}>
            <button
              className={`button-style pointer cercle-purple-text font-weight-600 font-18px font-cercular-bold`}
              style={{
                padding: "5px 20px",
                border: "1px solid #6f2da8",
              }}
            >
              Create Subscription
            </button>
          </Link>
        </div>
      </div>

      <div className="cover white p-2 mt-1">
        <span className="valign-wrapper justify-center mr-2 font-25px bold gap-1">
          <h3 className="mb-2">Choose your right plan!</h3>
          <img
            style={{ marginTop: "-10px" }}
            width="35px"
            src="/images/subscriptionIcon.png"
            alt="subscriptionIcon"
          />
        </span>

        <div
          className={`mt-2`}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(1,1fr)"
              : isTablet
                ? "repeat(2,1fr)"
                : isLaptop
                  ? "repeat(3,1fr)"
                  : "repeat(5, 1fr)",
            columnGap: "1rem",
            rowGap: "2rem",
          }}
        >
          {subscriptionLoading ? (
            <>
              {[...Array(subscriptionCollection?.length || 5)].map(
                (_, index) => (
                  <SubscriptionLoader key={index} />
                )
              )}
            </>
          ) : (
            <>
              {subscriptionCollection?.map((items, index) => (
                <SubscriptionPlan
                  key={items?.price}
                  recommended={items?.recommended}
                  items={items}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubcriptionPages;
