import React from "react";
import { ClipLoader } from "react-spinners";
import ReasonOfLotRejection from "./ReasonOfLotRejection";
import AcceptedLots from "./AcceptedLots";
import RejectedLots from "./RejectedLots";
import { useMediaQuery } from "react-responsive";

function ReportModalContent({
  isAccepted,
  acceptedOffers,
  rejectedOffers,
  setIsAcceptedModalOpen,
  setIsRejectedModalOpen,
  setProceedAuctionReport,
  proceedAuctionReport,
  singleAuctionData,
  setReasonOfRejectionLots,
  reasonOfRejectionLots,
  handleSubmitAuctionReport,
  isAcceptedModalOpen,
  isRejectedModalOpen,
  reportLoading,
}) {
  const isDastop = useMediaQuery({ query: "(max-width: 1550px)" });
  const offers = isAccepted ? acceptedOffers : rejectedOffers;
  const otherOffers = isAccepted ? rejectedOffers : acceptedOffers;

  const closeModal = (setModal) => setModal(false);
  return (
    <>
      <div className="valign-wrapper pin-top">
        <p
          className={`valign-wrapper gap-10px ${isAccepted ? "red-text" : "green-text"
            }`}
          style={{
            backgroundColor: isAccepted ? "#fddad8" : "#dceed6",
            padding: "10px 30px 10px 20px",
            borderRadius: "8px",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "22px", marginBottom: "2px" }}
          >
            info
          </span>
          <span>
            {" "}
            Unchecked items are automatically marked as{" "}
            {isAccepted ? "rejected" : "accepted"}.
          </span>
        </p>
        <span
          className="material-symbols-outlined pointer select-label"
          onClick={() => {
            closeModal(
              isAccepted ? setIsAcceptedModalOpen : setIsRejectedModalOpen
            );
            setProceedAuctionReport(false);
          }}
          style={{ top: "-1.2rem", right: "-0.5rem" }}
        >
          close
        </span>
      </div>
      <div className={`flex column ${isDastop ? "gap-1 mt-1" : "gap-2 mt-2"}`}>
        {/* Show Reason of Rejection if Proceeded */}
        {proceedAuctionReport ? (
          <>
            {otherOffers.length > 0 && (
              <RejectedLots
                rejectedOffers={otherOffers}
                offers={singleAuctionData?.offers}
              />
            )}
            <ReasonOfLotRejection
              setReasonOfRejectionLots={setReasonOfRejectionLots}
              reasonOfRejectionLots={reasonOfRejectionLots}
            />
          </>
        ) : (
          <>
            {offers.length > 0 && (
              <AcceptedLots
                acceptedOffers={offers}
                offers={singleAuctionData?.offers}
              />
            )}

            {otherOffers.length > 0 && (
              <RejectedLots
                rejectedOffers={otherOffers}
                offers={singleAuctionData?.offers}
              />
            )}
          </>
        )}
      </div>
      <div className={`flex justify-center gap-1 ${isDastop ? "mt-1" : "mt-2"}`}>
        {proceedAuctionReport ||
          offers?.length === singleAuctionData?.offers?.length ? (
          <button
            className="green btn-small"
            disabled={
              reasonOfRejectionLots === "" &&
              offers?.length !== singleAuctionData?.offers?.length
            }
            onClick={() =>
              handleSubmitAuctionReport(
                isAccepted ? acceptedOffers : rejectedOffers,
                isAccepted ? rejectedOffers : acceptedOffers,
                isAccepted ? isAcceptedModalOpen : isRejectedModalOpen,
                isAccepted ? setIsAcceptedModalOpen : setIsRejectedModalOpen
              )
            }
          >
            {reportLoading ? <ClipLoader color="red" size={20} /> : "Submit"}
          </button>
        ) : (
          <button
            className="green btn-small"
            onClick={() => setProceedAuctionReport(true)}
          >
            Confirm & Proceed
          </button>
        )}
        {/* <button
          className="red btn-small modal-close"
          onClick={() => {
            closeModal(
              isAccepted ? setIsAcceptedModalOpen : setIsRejectedModalOpen
            );
            setProceedAuctionReport(false);
          }}
        >
          No
        </button> */}
      </div>
    </>
  );
}

export default ReportModalContent;
