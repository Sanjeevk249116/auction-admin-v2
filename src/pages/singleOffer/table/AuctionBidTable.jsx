import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-materialize";
import {
  capitalizeFirstLetter,
  convertToIST12HourFormat,
  NoItemsLeftInTable,
} from "../../../helper/helpers";
import PickupInformation from "../pickupForm/PickupInformation";
import TableLoader from "../../commanPage/loader/TableLoader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { approveSaleIntimation } from "../../../redux/action/saleIntimation";

function AuctionBidTable({
  pickupButton = false,
  singleOfferData,
  offerDetailLoading,
}) {
  const navigate = useNavigate()
  const { id, offerId } = useParams();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [singleBidDetails, setSingleBidDetails] = useState({});
  const { saleIntimationLoading } = useSelector(
    (state) => state.saleIntimation
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winnerOrganization, setWinnerOrganization] = useState("");
  const [appectSaleIntimation, setAppectSaleIntimation] = useState(false);
  const viewDetailsFunctionality = (items) => {
    setSingleBidDetails(items);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModelOfAccept = () => {
    setAppectSaleIntimation(false);
    setWinnerOrganization("");
  };

  console.log(singleOfferData?.bids)

  if (offerDetailLoading) {
    return (
      <TableLoader
        headerData={[
          "H-Bidders",
          "Bidder",
          "Bid Amount",
          "Bid Time",
          "GST",
          "Action",
        ]}
      />
    );
  }

  return (
    <div>
      <div className="table-container-style mt-1">
        <table
          className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
        >
          <thead>
            <tr>
              <th>H-Bidders</th>
              <th>Bidder Name</th>
              <th>Bid Amount</th>
              <th>Bid Time</th>
              <th>GST</th>
              <th>Winning Status</th>
              {singleOfferData?.saleIntimation?.trader && (
                <th>Sale Intimation</th>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(singleOfferData?.bids) &&
              [...singleOfferData.bids].reverse().map((item, index) => {
                return (
                  <tr key={item?._id}>
                    <td>{index + 1}</td>
                    <td>{item?.organization?.organizationName}</td>
                    <td>{item?.bidAmount}</td>
                    <td>{convertToIST12HourFormat(item?.createdAt)}</td>
                    <td>{item?.organization?.GSTIN}</td>
                    {item?.winner === true ? (
                      <td style={{ width: "300px" }}>
                        {/* <button
                        type="submit"
                        className={`button-style white-text green lighten-1 pointer`}
                        style={{ padding: "6px 15px" }}
                        onClick={() => viewDetailsFunctionality(item)}
                      >
                        Accept & Riase Pickup
                      </button> */}
                        <span className={`green-text`}>Winner</span>
                      </td>
                    ) : (
                      <td>
                        <span
                          className={`${item?.status === "accepted"
                            ? "green-text"
                            : item?.status === "rejected"
                              ? "red-text"
                              : "orange-text"
                            }`}
                        >
                          {capitalizeFirstLetter(item?.status)}
                        </span>
                      </td>
                    )}
                    {singleOfferData?.saleIntimation?.trader && (
                      <td>
                        {index === 0 ? (
                          <span className="valign-wrapper justify-center gap-1">
                            <span
                              className="material-icons cercle-purple-text pointer"
                              onClick={() => navigate(`/view/sale-intimation/${singleOfferData?.saleIntimation?.fileId}`)}
                            >
                              visibility
                            </span>
                            <button
                              className="pointer font-16px white-text cercle-purple button-style"
                              style={{
                                padding: "6px 15px",
                                opacity:
                                  singleOfferData?.saleIntimation
                                    ?.adminApproval === "approvaled"
                                    ? 0.3
                                    : 1,
                              }}
                              disabled={
                                singleOfferData?.saleIntimation?.adminApproval ===
                                "approvaled"
                              }
                              onClick={() => {
                                setAppectSaleIntimation(true);
                                setWinnerOrganization(item?.organizationName);
                              }}
                            >
                              Accept
                            </button>
                          </span>
                        ) : (
                          <span>...</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {singleOfferData?.bids?.length === 0 && <NoItemsLeftInTable />}
      </div>

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        style={styles.modal}
        id="modalView-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <PickupInformation
          setIsModalOpen={setIsModalOpen}
          singleBidDetails={singleBidDetails}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={appectSaleIntimation}
        options={{
          onCloseEnd: closeModelOfAccept,
        }}
      >
        <div className="flex column gap-10px">
          <h5>
            Confirm Sale Intimation for{" "}
            <span className="cercle-purple-text">{winnerOrganization}.</span>
          </h5>
          <p>
            Are you sure to accept the sale intimation? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-end gap-1 mt-1">
          <button
            className="green btn-small"
            onClick={() => { dispatch(approveSaleIntimation(id, offerId)); setAppectSaleIntimation(false) }}
          >
            {saleIntimationLoading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              "Accept"
            )}
          </button>
          <button className="btn-small" onClick={closeModelOfAccept}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  modal: {
    width: "720px",
    maxHeight: "78%",
  },
  modalContent: {
    padding: "10px",
  },
};

export default AuctionBidTable;
