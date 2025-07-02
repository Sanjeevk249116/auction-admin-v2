import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { Modal } from "react-materialize";
import CreateSubscription from "./CreateSubscription";
import { useDispatch } from "react-redux";
import { archiveSubscriptionPlan } from "../../../redux/action/subscription";
import { useMediaQuery } from "react-responsive";
import { capitalizeEveryFirstLetter, NumberFormatter } from "../../../helper/helpers";

function SubscriptionPlan({
  recommended,
  items,
}) {
  const navigate = useNavigate();
  const isDastop = useMediaQuery({ query: "(max-width: 1550px)" });
  const [archiveModel, setArchiveModel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const viewDetailsFunctionality = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const viewArchiveModel = () => {
    setArchiveModel(true);
  };

  const closeArchiveModal = () => {
    setArchiveModel(false);
  };

  return (
    <div
      className={"border-radius-12 pin-top"}
      style={{
        border: "1px solid #6f2da8",
        height: "580px",
      }}
    >
      <div>
        <div style={{ zIndex: "1", padding: isDastop ? "6px" : "10px" }}>
          <p
            className=" font-16px lenar-gradiant white-text mb-1"
            style={{
              padding: "5px 8px",
              borderRadius: "8px",
            }}
          >
            {capitalizeEveryFirstLetter(items?.name)}
          </p>
          <span
            className="cercle-purple-text bold font-25px valign-wrapper"
          >
            ₹ {NumberFormatter(items?.price)} /<span className="font-20px">{items?.numberOfYears} {items?.numberOfYears === 1 ? "year" : "years"}</span>
          </span>
          {recommended && <span className="recommended-plan">Recommended</span>}
        </div>
        <hr />
        <div style={{ padding: isDastop ? "1rem 6px" : "1rem 10px" }}>
          <h2
            className="flex justify-center font-18px cercle-purple-text "
            style={{ marginTop: "0px" }}
          >
            Features
          </h2>
          {items?.features?.slice(0, 10)?.map((items, index) => (
            <p
              key={items}
              className={`${isDastop ? "font-13px" : "font-15px"} valign-wrapper fontstyle NoOfline`}
              style={{ WebkitLineClamp: 1, lineHeight: "25px" }}
            >
              <span className="material-icons-outlined cercle-purple-text font-14px">
                check
              </span>
              <span> {items}</span>
            </p>
          ))}
          {items?.features?.length > 10 && <p
            className=" font-14px valign-wrapper fontstyle NoOfline"
            style={{ WebkitLineClamp: 1, lineHeight: "25px" }}
          >
            <span className="material-icons-outlined cercle-purple-text font-15px">
              check
            </span>
            <span> ..... more</span>
          </p>}
        </div>
      </div>
      <div className="select-label valign-wrapper gap-10px" style={{
        top: "89%",
        left:isDastop?"14%": "25%",
      }}>
        <button
          className="cercle-purple-text pointer bold font-16px"
          style={{
            border: "1px solid #6f2da8",
            borderRadius: "30px",
            padding: "5px 15px",
          }}
          onClick={() => navigate(`/subscriptionDetails/${items?._id}`)}
        >
          Details
        </button>
        <span className="valign-wrapper gap-10px">
          <span
            className="material-icons-outlined pointer font-30px cercle-purple-text"
            onClick={viewDetailsFunctionality}
          >
            edit
          </span>
          <span
            className="material-icons-outlined pointer font-30px"
            onClick={viewArchiveModel}
          >
            archive
          </span>
        </span>
      </div>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        style={!isDastop ? styles.modal : styles.modalHeight}
        className="modelAccount"
        id="modalView-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <CreateSubscription
          editSubscription={items}
          setmodel={setIsModalOpen}
          canEdit={true}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={archiveModel}
        options={{
          onCloseEnd: closeArchiveModal,
        }}
      >
        <p>Are you sure to archive the subscription plan features</p>

        <div className="flex justify-end gap-1 mt-1">
          <button
            className="green btn-small"
            onClick={() => {
              dispatch(archiveSubscriptionPlan(items?._id, setArchiveModel));
            }}
          >
            ok
          </button>
          <button
            className="red btn-small modal-close"
            onClick={() => closeArchiveModal()}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
const styles = {
  modal: {
    width: "1000px",
    maxHeight: "800px",
  },
  modalHeight: {
    maxHeight: "600px",
  }
};

export default SubscriptionPlan;
