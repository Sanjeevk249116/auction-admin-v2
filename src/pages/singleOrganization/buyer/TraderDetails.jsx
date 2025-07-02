import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountInfoDashboard from "../../dashboard/comman/components/AccountInfoDashboard";
import { Dropdown, Modal } from "react-materialize";
import VerifyAccount from "./components/VerifyAccount";
import { useDispatch, useSelector } from "react-redux";
import { verifiedPCBAccount } from "../../../redux/action/singleAccount";
import { ClipLoader } from "react-spinners";
import DocumnentsCollection from "./documents/DocumnentsCollection";

function TraderDetails({ singleAccountdata }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, auctionId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [verifiedPCBModel, setVerifiedPCBModel] = useState(false);
  const { pcbVerifyLoading } = useSelector((state) => state.singleAccount);

  const handleBlockAccountConfirmation = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const verifyModalClose = () => {
    setVerifyModal(false);
  };

  return (
    <div>
      <div className="valign-wrapper space-between">
        <span className="valign-wrapper gap-1">
          <span
            className="material-icons-outlined pointer"
            onClick={() => {
              auctionId === undefined
                ? navigate("/trader-collection")
                : navigate(`/single-auction/${auctionId}`);
            }}
          >
            arrow_back
          </span>
          <h4>Buyer Details</h4>
        </span>
        <div className="valign-wrapper gap-1">
          <button
            className={`button-style pointer cercle-purple-text`}
            style={{
              padding: "7px 20px",
              border: "1px solid #6f2da8",
            }}
            onClick={() =>
              navigate(`/single-organization/buyer/paySubscription/${id}`)
            }
          >
            Update Subscription
          </button>
          <button
            className={`button-style pointer white-text font-18px`}
            style={{
              padding: "7px 20px",
              backgroundImage: "linear-gradient(#3C0A67, #6F2DA8)",
            }}
            onClick={() => {
              navigate(`/wallet/${singleAccountdata?._id}`);
            }}
          >
            View wallet
          </button>

          <Dropdown
            id={`wallet-account`}
            options={{
              alignment: "left",
              constrainWidth: false,
              coverTrigger: false,
            }}
            trigger={
              <span className="material-icons-outlined pointer">more_vert</span>
            }
          >
            <div
              className="valign-wrapper column white justify-center"
              style={{ width: "170px" }}
            >
              <button
                className={`pointer font-16px full-width ${
                  !singleAccountdata?.verified && "onHover"
                }`}
                style={{
                  padding: "10px 0px",
                  opacity: singleAccountdata?.verified && 0.5,
                }}
                disabled={singleAccountdata?.verified}
                onClick={() => setVerifyModal(true)}
              >
                Verify Account
              </button>
              <p className={`full-width grey`} style={{ height: "1px" }}></p>
              <button
                className={`pointer font-16px full-width ${
                  !singleAccountdata?.PCBVerified && "onHover"
                }`}
                style={{
                  padding: "10px 0px",
                  opacity: singleAccountdata?.PCBVerified && 0.5,
                }}
                disabled={singleAccountdata?.PCBVerified}
                onClick={() => setVerifiedPCBModel(true)}
              >
                Verify PCB Account
              </button>
              <p className="full-width grey" style={{ height: "1px" }}></p>
              <button
                className="pointer font-16px full-width onHover"
                style={{ padding: "10px 0px" }}
                onClick={handleBlockAccountConfirmation}
              >
                Block Account
              </button>
            </div>
          </Dropdown>
        </div>
      </div>
      <AccountInfoDashboard auctionInformation={singleAccountdata} />
      <div className="mt-2 mb-2">
        <DocumnentsCollection />
      </div>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <h4 className="normal-size">Confirm to block this account.</h4>
        <b className="font-16px">
          Are you sure you want to block this account? Blocking this account
          will:
        </b>
        <ul>
          <li>Prevent the user from accessing their account.</li>
          <li>
            Suspend all current and future actions associated with this account.
          </li>
          <li>
            Restrict the account from participating in any auctions or
            activities.
          </li>
        </ul>
        <p>
          <strong>This action cannot be undone.</strong> Please confirm that you
          want to proceed.
        </p>
        <div className="flex justify-end gap-1 mt-1">
          <button className="green btn-small" onClick={() => {}}>
            Yes
          </button>
          <button
            className="red btn-small modal-close"
            onClick={() => setIsModalOpen(false)}
          >
            No
          </button>
        </div>
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={verifyModal}
        options={{
          onCloseEnd: verifyModalClose,
        }}
      >
        <VerifyAccount
          setIsModalOpen={setVerifyModal}
          organizationName={singleAccountdata?.organizationName}
          id={id}
        />
      </Modal>

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-pcbConfirmation"
        open={verifiedPCBModel}
        options={{
          onCloseEnd: () => setVerifiedPCBModel(false),
        }}
      >
        <div className="flex column gap-10px">
          <h4 className="normal-size">Confirm PCB Account Verification</h4>
          <h6 className="font-16px">
            Are you sure you want to verify this PCB account? Verifying this
            account will:
          </h6>
          <ul>
            <li>Allow the user to fully access their account features.</li>
            <li>
              Enable the account to participate in auctions and activities.
            </li>
            <li>and many more.</li>
          </ul>
          <div className="flex justify-end gap-1 mt-1">
            <button
              className="green btn-small"
              onClick={() =>
                dispatch(verifiedPCBAccount(id, setVerifiedPCBModel))
              }
            >
              {pcbVerifyLoading ? <ClipLoader color="red" size={20} /> : "Yes"}
            </button>
            <button
              className="red btn-small modal-close"
              onClick={() => setVerifiedPCBModel(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TraderDetails;
