import React, { useEffect, useState } from "react";
import { Modal } from "react-materialize";
import { useMediaQuery } from "react-responsive";
import AcceptWithdrawalModel from "../children/AcceptWithdrawalModel";
import RejectWithdrawalModel from "../children/RejectWithdrawalModel";

function TripleSwitchButton({ withdrawalDerails }) {
  const [buttonPosition, setButtonPosition] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [openAccpetModal, setOpenAcceptModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);

  const withdrawalStatus = () => {
    if (withdrawalDerails?.status === "approved") {
      setButtonPosition(1);
    } else if (withdrawalDerails?.status === "rejected") {
      setButtonPosition(2);
    } else {
      setButtonPosition(null);
    }
  };

  useEffect(() => {
    withdrawalStatus();
  }, [withdrawalDerails]);

  return (
    <span
      className={`withdrwalSwitch flex  ${isMobile ? "column text-center" : "white"
        } lighten-4`}
      style={{ width: "138px", opacity: withdrawalDerails?.status === "completed" ? 0.3 : 1 }}
    >
      <p
        className={`pointer bold
          ${buttonPosition === 1
            ? "WithdrwalgliderGBg white-text"
            : "withdrwalBoder"
          }`}
        onClick={() => {
          if (withdrawalDerails?.status === "rejected" || withdrawalDerails?.status === "approved" || withdrawalDerails?.status === "completed") {
            return;
          }

          setButtonPosition(1);
          setOpenAcceptModal(true);
        }}
      >
        Accept
      </p>
      <p
        className={`pointer bold  ${buttonPosition === 2 ? `white-text ` : " withdrwalBoder"
          }
            ${buttonPosition === 2
            ? "WithdrwalgliderRBg white-text "
            : "withdrwalBoder"
          }`}
        onClick={() => {
          if (
            withdrawalDerails?.status === "rejected" ||
            withdrawalDerails?.status === "completed"
          ) {
            return;
          }
          setButtonPosition(2);
          setOpenRejectModal(true);
        }}
      >
        Reject
      </p>

      {/* {!isMobile && (
        <span
          className={`Withdrwalglider ${buttonPosition === 1
            ? "WithdrwalgliderGBg"
            : buttonPosition === 2
              ? "WithdrwalgliderRBg"
              : ""
            }`}
          style={{
            transform:
              buttonPosition === 2
                ? "translateX(107%)"
                : "translateX(0%)",
          }}
        ></span>
      )} */}

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="view-details"
        open={openAccpetModal}
        options={{
          onCloseEnd: () => {
            setOpenAcceptModal(false);
            withdrawalStatus();
          },
        }}
      >
        <AcceptWithdrawalModel
          WithdrawalDetails={withdrawalDerails}
          setOpenAcceptModal={setOpenAcceptModal}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="view-details"
        open={openRejectModal}
        options={{
          onCloseEnd: () => {
            setOpenRejectModal(false);
            withdrawalStatus();
          },
        }}
      >
        <RejectWithdrawalModel
          WithdrawalDetails={withdrawalDerails}
          setOpenRejectModal={setOpenRejectModal}
        />
      </Modal>
    </span>
  );
}

export default TripleSwitchButton;
