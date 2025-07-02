import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import UnArchiveSubscriptionPlan from "../children/UnArchiveSubscriptionPlan";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllArchiveSubscription } from "../../../redux/action/subscription";
import SubscriptionLoader from "../../commanPage/loader/SubscriptionLoader";

function ArchiveSubscription() {
  const navigate = useNavigate();
  const isLaptop = useMediaQuery({ query: "(max-width: 1230px)" });
  const dispatch = useDispatch();

  const { subscriptionLoading, archiveSubscription } = useSelector(
    (state) => state.susbcription
  );

  useEffect(() => {
    dispatch(getAllArchiveSubscription());
  }, [dispatch]);



  return (
    <div className="mt-1">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Archive Subscription</h4>
      </span>

      <div className="cover white p-1 mt-1">
        <b className="valign-wrapper justify-center font-20px">Archive plan</b>

        <div
          className={`valign-wrapper justify-center mt-2 ${
            isLaptop ? "gap-2 flex-wrap" : "gap-3"
          }`}
        >
          {subscriptionLoading ? (
            <>
              {[...Array(archiveSubscription?.length||3)].map((_, index) => (
                <SubscriptionLoader key={index} />
              ))}
            </>
          ) : (
            <>
              {archiveSubscription?.map((items, index) => (
                <UnArchiveSubscriptionPlan
                  key={items?.price}
                  planFeature={items?.features}
                  price={items?.price}
                  plan={items?.name}
                  loading={false}
                  id={items?._id}
                  recommended={items?.recommended}
                  items={items}
                />
              ))}
            </>
          )}
        </div>
        {archiveSubscription?.length === 0 && (
          <div
            className="valign-wrapper justify-center"
            style={{ height: "200px" }}
          >
            {" "}
            No items inside the Archive Subcription
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchiveSubscription;
