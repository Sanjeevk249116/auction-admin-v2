import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { adminPaySubscription } from "../../../../../redux/action/subscription";
import { ClipLoader } from "react-spinners";

function ConfirmSubscriptionModel({
  setConfirmModalOpen,
  selectPaySubscription,
}) {
  const { OrganID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminPaidSubscriptionLoading } = useSelector(
    (state) => state.susbcription
  );
  const { singleAccountdata } = useSelector((state) => state.singleAccount);

  const handleConfirmSubscription = () => {
    dispatch(
      adminPaySubscription(
        selectPaySubscription?._id,
        OrganID,
        navigate,
        setConfirmModalOpen
      )
    );
  };

  return (
    <div>
      <h5 className="">
        Confirm Subscription for{" "}
        <span className="green-text">{singleAccountdata?.owner?.email}</span>
      </h5>
      <p className="font-16px mt-1">
        Are you sure you want to subscribe to the{" "}
        <span className="cercle-purple-text font-18px">
          Rs. {selectPaySubscription?.price}
        </span>{" "}
        plan?
        <br />
        <span className="font-16px">
          Subcription Name is{" "}
          <span className="cercle-purple-text font-18px">
            {selectPaySubscription?.name}
          </span>
        </span>
      </p>
      <div className="flex justify-end gap-1 mt-1">
        <button className="green btn-small" onClick={handleConfirmSubscription}>
          {adminPaidSubscriptionLoading ? (
            <ClipLoader color="red" size={20} />
          ) : (
            "Confirm"
          )}
        </button>
        <button
          className="red btn-small modal-close"
          onClick={() => setConfirmModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmSubscriptionModel;
