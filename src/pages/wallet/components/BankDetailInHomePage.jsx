import React, { useState } from "react";
import { Modal } from "react-materialize";
import { useMediaQuery } from "react-responsive";
import Walletbankdetails from "../children/Walletbankdetails";
// import Walletbankdetails from "./Walletbankdetails";

function BankDetailInHomePage({ item }) {
  const isMobile = useMediaQuery({ query: "(max-width: 567px)" });
  const [personalDetails, setPersonalDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewDetailsFunctionality = (items) => {
    setPersonalDetails(items);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`valign-wrapper space-between mt-1 mb-1 ${
        !isMobile && "ml-3 mr-1"
      }`}
    >
      <span className="valign-wrapper gap-1">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "35px" }}
        >
          assured_workload
        </span>
        <div>
          <span className="valign-wrapper" style={{ gap: "5px" }}>
            <span className="font-cercular-bold font-18px">
              {item?.holderName}-{String(item.accountNo).slice(-5)}
              {`  (${item?.bankName})`}
            </span>
            {item?.verified && (
              <span className="material-symbols-outlined cercle-purple-text">
                verified
              </span>
            )}
          </span>
          <p className="flex align-center">
            {item.verified ? (
              <span className="material-symbols-outlined normal-size green-text">
                verified
              </span>
            ) : (
              <span className="material-symbols-outlined normal-size grey-text">
                error
              </span>
            )}
            <span className={`${item.verified ? "green-text" : "grey-text"}`}>
              {item.verified ? "Verified" : "Not Verified"}
            </span>
          </p>
        </div>
      </span>
      <button
        className="cercle-purple-text font-16px font-weight-600"
        onClick={() => viewDetailsFunctionality(item)}
      >
        View details
      </button>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalAccount-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <Walletbankdetails bankDetail={personalDetails} setIsModalOpen={setIsModalOpen}/>
      </Modal>
    </div>
  );
}

export default BankDetailInHomePage;
