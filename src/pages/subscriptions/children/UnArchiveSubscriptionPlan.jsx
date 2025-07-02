import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { Modal } from "react-materialize";
import { useDispatch } from "react-redux";
import { deleteSubscriptionPlan, unArchiveSubscriptionPlan } from "../../../redux/action/subscription";

function UnArchiveSubscriptionPlan({
  price,
  planFeature,
  plan,
  id,
  recommended,
  items,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [unArchiveModel, setUnArchiveModel] = useState(false);
  const [deleteSubscriptionPlans, setDeleteSubscriptionPlans] = useState(false);

  const viewArchiveModel = () => {
    setUnArchiveModel(true);
  };

  const closeArchiveModal = () => {
    setUnArchiveModel(false);
  };

  const deleteSubscriptionPlanModel = () => {
    setDeleteSubscriptionPlans(true);
  };

  const closeDeleteSubsctionPlanModel = () => {
    setDeleteSubscriptionPlans(false);
  };


  return (
    <div
      className={"border-radius-12 pin-top select-wrapper "}
      style={{
        border: "1px solid #6f2da8",
        height: "580px",
        width: "470px",
      }}
    >
      <div>
        <div className="p-1" style={{ zIndex: "1" }}>
          <div className="valign-wrapper space-between">
            <p
              className=" font-16px lenar-gradiant white-text mb-1"
              style={{
                padding: "5px 25px",
                borderRadius: "8px",
              }}
            >
              {plan.toUpperCase()}
            </p>
            <span className="valign-wrapper gap-1">
              {/* <span
                className="material-icons-outlined pointer font-30px cercle-purple-text"
                onClick={viewDetailsFunctionality}
              >
                edit
              </span> */}
              <span
                className="material-icons-outlined pointer font-30px red-text"
                onClick={() => deleteSubscriptionPlanModel()}
              >
                delete
              </span>
              <span
                className="material-icons-outlined pointer font-30px"
                onClick={() => viewArchiveModel()}
              >
                unarchive
              </span>
            </span>
          </div>
          <span
            className="cercle-purple-text bold"
            style={{ fontSize: "40px" }}
          >
            ₹ {price} /<span className="font-20px">{items?.numberOfYears} years</span>
          </span>
          {recommended && <span className="recommended-plan">Recommended</span>}
        </div>
        <hr />
        <div className="p-1">
          <h2 className="flex justify-center  font-25px cercle-purple-text ">
            Features
          </h2>
          {planFeature?.map((items, index) => (
            <p
              key={items}
              className=" font-16px valign-wrapper fontstyle NoOfline"
              style={{ WebkitLineClamp: 1, lineHeight: "28px" }}
            >
              <span className="material-icons-outlined cercle-purple-text font-18px">
                check
              </span>
              <span> {items}</span>
            </p>
          ))}
        </div>
      </div>
      <button
        className="cercle-purple-text select-label pointer bold font-20px"
        style={{
          border: "1px solid #6f2da8",
          top: "87%",
          left: "37%",
          borderRadius: "30px",
          padding: "5px 30px 5px 30px",
        }}
        onClick={() => navigate(`/subscriptionDetails/${id}`)}
      >
        Details
      </button>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={unArchiveModel}
        options={{
          onCloseEnd: closeArchiveModal,
        }}
      >
        <p>Are you sure to unarchive the subscription plan features</p>

        <div className="flex justify-end gap-1 mt-1">
          <button
            className="green btn-small"

            onClick={() => dispatch(unArchiveSubscriptionPlan(id, setUnArchiveModel))}
          >
            ok
          </button>
          <button
            className="red btn-small modal-close"
            onClick={() => closeArchiveModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={deleteSubscriptionPlans}
        options={{
          onCloseEnd: closeDeleteSubsctionPlanModel,
        }}
      >
        <p>Are you sure to Delete the subscription plan</p>

        <div className="flex justify-end gap-1 mt-1">
          <button
            className="green btn-small"

            onClick={() => dispatch(deleteSubscriptionPlan(id))}
          >
            ok
          </button>
          <button
            className="red btn-small modal-close"
            onClick={() => closeDeleteSubsctionPlanModel}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}


export default UnArchiveSubscriptionPlan;
