import React, { useEffect, useState } from "react";
import { Modal } from "react-materialize";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CompletedLotsTable from "../table/CompletedLotsTable";
import ReportModalContent from "../children/ReportModalContent";
import { postAuctionReportsWithAcceptedLots, postAuctionReportsWithRejectedLots } from "../../../redux/action/auctionReport";

function AuctionReportApproval({ singleAuctionData, loading }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rejectedOffers, setRejectedOffers] = useState([]);
  const [acceptedOffers, setAcceptedOffers] = useState([]);
  const [proceedAuctionReport, setProceedAuctionReport] = useState(false);
  const [reasonOfRejectionLots, setReasonOfRejectionLots] = useState("");
  const [isAcceptedModalOpen, setIsAcceptedModalOpen] = useState(false);
  const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false);
  const { reportLoading } = useSelector((state) => state.auctionReport);
  const [removeOSelectedOffers, setRemoveOSelectedOffers] = useState(false);

  const closeModal = (setModal) => setModal(false);

  const convertOffersToArrayOfObj = (offers) => {
    return offers.map((offerId) => ({ offer: offerId }));
  };

  const searchOrganizationIdWithOfferId = async (offerId) => {
    const modifyArrayOfObject = await singleAuctionData?.offers?.filter((offer) => offerId.includes(offer._id))
      .map((offer) => ({
        organizationId: offer?.bids?.[offer?.bids?.length - 1]?.organization,
        offerId: offer?._id,
      }));
    return modifyArrayOfObject;
  }



  const handleSubmitAuctionReport = (
    acceptedIds,
    rejectedIds,
    isModalOpen,
    setModal
  ) => {
    if (acceptedIds?.length === singleAuctionData?.offers?.length && rejectedIds?.length === 0) {
      dispatch(
        postAuctionReportsWithAcceptedLots(
          id,
          searchOrganizationIdWithOfferId(acceptedIds),
          setModal,
          setAcceptedOffers,
          setRejectedOffers,
          setRemoveOSelectedOffers,
        )
      );
    } else {
      dispatch(
        postAuctionReportsWithRejectedLots(
          id,
          convertOffersToArrayOfObj(acceptedIds),
          convertOffersToArrayOfObj(rejectedIds),
          reasonOfRejectionLots,
          setModal,
          setAcceptedOffers,
          setRejectedOffers,
          setRemoveOSelectedOffers,
          // acceptedIds?.length === singleAuctionData?.offers?.length
        )
      );
    }

  };

  useEffect(() => {
    if (!isAcceptedModalOpen || !isRejectedModalOpen) {
      setProceedAuctionReport(false);
    }
  }, [isAcceptedModalOpen, isRejectedModalOpen]);

  useEffect(() => {
    if (singleAuctionData?.offers) {
      const allOfferIds = singleAuctionData?.offers.map((item) => item._id);
      const rejectedIds = allOfferIds.filter(
        (id) => !acceptedOffers.includes(id)
      );
      setRejectedOffers(rejectedIds);
    }
  }, [acceptedOffers, singleAuctionData]);

  const isDisabled = () => {
    if (acceptedOffers?.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex column gap-10px mb-1">
      <CompletedLotsTable
        offers={singleAuctionData?.offers}
        loading={loading}
        setAcceptedOffers={setAcceptedOffers}
        setRejectedOffers={setRejectedOffers}
        removeOSelectedOffers={removeOSelectedOffers}
        startingPriceApproval={singleAuctionData?.startingPriceApproval?.status === "approval"}
        lotApproved={
          singleAuctionData?.auctionReport
            && (singleAuctionData?.auctionReport?.rejectedOffers?.length > 0 ||
              singleAuctionData?.auctionReport?.acceptedOffers?.length > 0) ? singleAuctionData?.auctionReport
            : false
        }
      />
      {(!singleAuctionData?.auctionReport ||
        (singleAuctionData?.auctionReport?.rejectedOffers?.length === 0 ||
          singleAuctionData?.auctionReport?.acceptedOffers?.length === 0)) && (
          <div className="flex justify-center gap-1">
            <button
              className={`button-style pointer font-16px ${isDisabled() ? "grey lighten-2" : "white-text cercle-purple"
                }`}
              style={{ padding: "10px 25px" }}
              onClick={() => setIsAcceptedModalOpen(true)}
              disabled={isDisabled()}
            >
              Accept Auction Report
            </button>
            <button
              className={`button-style pointer font-16px ${isDisabled() ? "grey lighten-2" : "white-text red"
                }`}
              style={{ padding: "10px 25px" }}
              onClick={() => setIsRejectedModalOpen(true)}
              disabled={isDisabled()}
            >
              Reject Auction Report
            </button>
          </div>
        )}
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        style={styles.modal}
        className="modelAccount"
        id="modalView-details"
        open={isAcceptedModalOpen}
        options={{ onCloseEnd: () => closeModal(setIsAcceptedModalOpen) }}
      >
        <ReportModalContent
          isAccepted={true}
          acceptedOffers={acceptedOffers}
          rejectedOffers={rejectedOffers}
          setIsAcceptedModalOpen={setIsAcceptedModalOpen}
          setIsRejectedModalOpen={setIsRejectedModalOpen}
          setProceedAuctionReport={setProceedAuctionReport}
          proceedAuctionReport={proceedAuctionReport}
          singleAuctionData={singleAuctionData}
          setReasonOfRejectionLots={setReasonOfRejectionLots}
          reasonOfRejectionLots={reasonOfRejectionLots}
          handleSubmitAuctionReport={handleSubmitAuctionReport}
          isAcceptedModalOpen={isAcceptedModalOpen}
          isRejectedModalOpen={isRejectedModalOpen}
          reportLoading={reportLoading}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        style={styles.modal}
        className="modelAccount"
        id="modalView-details"
        open={isRejectedModalOpen}
        options={{ onCloseEnd: () => closeModal(setIsRejectedModalOpen) }}
      >
        <ReportModalContent
          isAccepted={false}
          acceptedOffers={acceptedOffers}
          rejectedOffers={rejectedOffers}
          setIsAcceptedModalOpen={setIsAcceptedModalOpen}
          setIsRejectedModalOpen={setIsRejectedModalOpen}
          setProceedAuctionReport={setProceedAuctionReport}
          proceedAuctionReport={proceedAuctionReport}
          singleAuctionData={singleAuctionData}
          setReasonOfRejectionLots={setReasonOfRejectionLots}
          reasonOfRejectionLots={reasonOfRejectionLots}
          handleSubmitAuctionReport={handleSubmitAuctionReport}
          isAcceptedModalOpen={isAcceptedModalOpen}
          isRejectedModalOpen={isRejectedModalOpen}
          reportLoading={reportLoading}
        />
      </Modal>
    </div>
  );
}
const styles = {
  modal: {
    maxHeight: "1000px",
  },
};
export default AuctionReportApproval;
