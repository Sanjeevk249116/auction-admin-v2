import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { NoItemsLeftInTable } from "../../../../../helper/helpers";
import { Modal } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import {
  approvedCatelogue,
  approvedNotCatelogue,
  getAllDetailOfcatalogue,
} from "../../../../../redux/action/catelogue";
import TableLoader from "../../../../commanPage/loader/TableLoader";
import CatalogueTableRow from "./CatalogueTableRow";

function CatelogueTable({ singleAuctionData }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCatalogueList, setAllCatalogueList] = useState([])
  const [isApproveNotModal, setIsApproveNotModal] = useState(false);
  const [approvedData, setApprovedData] = useState("");
  const [notApprovelData, setNotApprovelData] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [reasonForReject, setReasonForReject] = useState("");
  const { CatelogueLoading, allCatalogueDetails } = useSelector(
    (state) => state.catelogueData
  );

  useEffect(() => {
    if (isModalOpen || isApproveNotModal) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [isModalOpen, isApproveNotModal]);

  const viewDetailsFunctionality = (items) => {
    setIsModalOpen(true);
    setApprovedData(items);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const viewModelForNotApprovel = (items) => {
    setIsApproveNotModal(true);
    setNotApprovelData(items);
  };

  const closeModalForNotApprovel = () => {
    setIsApproveNotModal(false);
    setTimeout(() => {
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    }, 400);
  };

  function convertObjectToArray(obj) {
    if (Object.keys(obj).length === 0) {
      return [];
    }

    return [obj];
  }

  const sendResponse = (e) => {
    dispatch(
      approvedNotCatelogue(
        id,
        notApprovelData?._id,
        { message: reasonForReject },
        setNotApprovelData,
        setIsApproveNotModal,
        setReasonForReject
      )
    );
    closeModalForNotApprovel();
  };

  useEffect(() => {
    dispatch(getAllDetailOfcatalogue(id));
  }, [dispatch, id]);

  useEffect(() => {
    const arrayObjOfCatalogue = convertObjectToArray(allCatalogueDetails)
    setAllCatalogueList(arrayObjOfCatalogue)

  }, [allCatalogueDetails])



  if (CatelogueLoading) {
    return (
      <div className="valign-wrapper justify-center cover white mt-1">
        <TableLoader
          headerData={[
            "File Name",
            "File Size",
            "Downloads",
            "Views",
            "Accepted",
            "Status",
            "Action",
          ]}
        />
      </div>
    );
  }

  return (
    <div className={`mt-1 ${!isTablet && "table-container-style"}`}>
      <table
        className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
          } `}
      >
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size</th>
            <th>Download By</th>
            <th>View By</th>
            <th>Accepted By</th>
            <th>Rejected By</th>
            <th>Created at</th>
            <th>Catalogue Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allCatalogueList?.map((item, index) => (
            <CatalogueTableRow
              key={item?._id}
              item={item}
              viewModelForNotApprovel={viewModelForNotApprovel}
              viewDetailsFunctionality={viewDetailsFunctionality}
              expandedRow={expandedRow}
              setExpandedRow={setExpandedRow}
              singleAuctionData={singleAuctionData}
            />

          ))}
        </tbody>
      </table>
      {allCatalogueList?.length === 0 && <NoItemsLeftInTable height={isTablet ? "320px" : "210px"} />}
      <ReactTooltip
        id={`tooltip-timeline`}
        place="top"
        content={<p>Activity History</p>}
      />
      <ReactTooltip
        id={`tooltip-downlaodList`}
        place="top"
        content={<p>Downloaded List</p>}
      />
      <ReactTooltip
        id={`tooltip-viewList`}
        place="top"
        content={<p>View List</p>}
      />
      <ReactTooltip
        id={`tooltip-acceptedList`}
        place="top"
        content={<p>Accepted List</p>}
      />
      <ReactTooltip
        id={`tooltip-rejectedList`}
        place="top"
        content={<p>Rejected List</p>}
      />
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
        <h4 className="normal-size">
          Confirm to Approved {approvedData?.fileName} Catelogue.
        </h4>
        <p>
          <strong>This action cannot be undone.</strong> Please confirm that you
          want to proceed.
        </p>
        <div className="flex justify-end gap-1 mt-1">
          <button
            className="green btn-small"
            onClick={() =>
              dispatch(
                approvedCatelogue(
                  id,
                  approvedData?._id,
                  setApprovedData,
                  setIsModalOpen
                )
              )
            }
          >
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
        open={isApproveNotModal}
        options={{
          onCloseEnd: closeModalForNotApprovel,
        }}
      >
        <p>Reason for not Approve {notApprovelData?.fileName}</p>
        <textarea
          className="border-radius-12"
          rows="10"
          name="reason"
          value={reasonForReject}
          style={{
            border: "10px solid transparent",
            outline: "2px solid transparent",
            minHeight: "100px",
            backgroundColor: "#f2f4fd",
          }}
          onChange={(e) => setReasonForReject(e.target.value)}
        />
        <div className="flex justify-end gap-1 mt-1">
          <button
            className="green btn-small"
            disabled={reasonForReject === ""}
            onClick={() => sendResponse()}
          >
            Submit
          </button>
          <button
            className="red btn-small modal-close"
            onClick={() => setIsApproveNotModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CatelogueTable;
