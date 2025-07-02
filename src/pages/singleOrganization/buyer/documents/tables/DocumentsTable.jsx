import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Dropdown, Modal } from "react-materialize";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RejectModal from "../children/RejectModal";
import VerifyModal from "../children/VerifyModal";
import {
  capitalizeFirstLetter,
  formatFileSize,
  handleDateSetUp,
  NoItemsLeftInTable,
} from "../../../../../helper/helpers";
import TableLoader from "../../../../commanPage/loader/TableLoader";
import { downloadFile } from "../../../../../redux/action/document";
import ViewDocument from "../children/ViewDocument";
import DeleteModel from "../children/DeleteModel";

function DocumentsTable({ documentValue, loading }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isDeleteDocument, setIsDeleteDocument] = useState(false);
  const [isViewDocument, setIsViewDocument] = useState(false);
  const [viewDocumentDetails, setViewDocumentDetails] = useState({});
  const [fileData, setFileData] = useState("");

  const closeModal = () => {
    setRejectModalOpen(false);
  };

  const closeModalConfirm = () => {
    setConfirmModalOpen(false);
  };
  return (
    <div className={`${!isTablet && "table-container-style"}`}>
      {loading ? (
        <div className="valign-wrapper justify-center cover white">
          <TableLoader
            headerData={[
              "S.No",
              "Type of Document",
              "Uploaded document",
              "Status",
              "Action",
            ]}
          />
        </div>
      ) : (
        <table
          className={`responsive-table centered ${
            isTablet ? "auction_table table-style" : "custom-table-style"
          } `}
        >
          <thead className="grey lighten-4">
            <tr>
              <th>S.No</th>
              <th>Type of Document</th>
              <th>Uploaded document </th>
              <th>File Size</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documentValue?.map((items, index) => (
              <tr key={items._id}>
                <td>{index + 1}</td>
                <td style={{ width: !isTablet && "250px" }}>
                  {items?.fileType}
                </td>
                <td style={{ width: !isTablet && "350px" }}>
                  <span>{items?.fileName}</span>
                </td>
                <td>{formatFileSize(items?.fileSize)}</td>
                <td>{handleDateSetUp(items?.uploadDate)}</td>

                <td
                  className={`${
                    items?.status === "verified"
                      ? "green-text"
                      : items.status === "rejected"
                      ? "red-text text-accent-4"
                      : "amber-text"
                  }`}
                >
                  {capitalizeFirstLetter(items?.status) || "..."}
                </td>

                <td>
                  <span className="valign-wrapper gap-1 justify-center">
                    <button
                      onClick={() => {
                        dispatch(
                          downloadFile(id, items?.fileId, items.fileName)
                        );
                      }}
                    >
                      <span className="material-symbols-outlined">
                        download
                      </span>
                    </button>
                    <span
                      className="material-symbols-outlined pointer"
                      onClick={() => {
                        setIsViewDocument(true);
                        setViewDocumentDetails(items);
                      }}
                    >
                      visibility
                    </span>

                    <Dropdown
                      id={`${items?._id}`}
                      options={{
                        // alignment: "left",
                        constrainWidth: false,
                        coverTrigger: false,
                      }}
                      trigger={
                        <span className="material-icons-outlined pointer">
                          more_vert
                        </span>
                      }
                    >
                      <div
                        className="valign-wrapper column white justify-center"
                        style={{ width: "170px" }}
                      >
                        <button
                          className={`pointer font-16px full-width ${
                            items?.status !== "verified" && "onHover"
                          }`}
                          style={{
                            padding: "10px 0px",
                            opacity: items?.status === "verified" ? 0.5 : 1,
                          }}
                          disabled={items?.status === "verified"}
                          onClick={() => {
                            setFileData(items);
                            setConfirmModalOpen(true);
                          }}
                        >
                          Verify
                        </button>
                        <p
                          className="full-width grey"
                          style={{ height: "1px" }}
                        ></p>
                        <button
                          className={`pointer font-16px full-width ${
                            items?.status !== "rejected" && "onHover"
                          }`}
                          style={{ padding: "10px 0px", opacity: items?.status === "rejected" ? 0.5 : 1 }}
                          disabled={items?.status === "rejected"}
                          onClick={() => {
                            setFileData(items);
                            setRejectModalOpen(true);
                          }}
                        >
                          Reject
                        </button>
                        <p
                          className="full-width grey"
                          style={{ height: "1px" }}
                        ></p>
                        <button
                          className="pointer font-16px full-width onHover red-text"
                          style={{ padding: "10px 0px" }}
                          onClick={() => {
                            setFileData(items);
                            setIsDeleteDocument(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </Dropdown>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {documentValue?.length === 0 && <NoItemsLeftInTable />}

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        style={styles.modal}
        className="modelAccount"
        id="view-details"
        open={isViewDocument}
        options={{
          onCloseEnd: () => setIsViewDocument(false),
        }}
      >
        <ViewDocument
          setIsViewDocument={setIsViewDocument}
          id={id}
          fileId={viewDocumentDetails?.fileId}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        style={styles.modal}
        className="modelAccount"
        id="view-details"
        open={isDeleteDocument}
        options={{
          onCloseEnd: () => setIsDeleteDocument(false),
        }}
      >
        <DeleteModel
          setIsDeleteDocument={setIsDeleteDocument}
          setFileData={setFileData}
          fileData={fileData}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="view-details"
        open={rejectModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <RejectModal
          setRejectModalOpen={setRejectModalOpen}
          setFileData={setFileData}
          fileData={fileData}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="view-details"
        open={confirmModalOpen}
        options={{
          onCloseEnd: closeModalConfirm,
        }}
      >
        <VerifyModal
          setConfirmModalOpen={setConfirmModalOpen}
          setFileData={setFileData}
          fileData={fileData}
        />
      </Modal>
    </div>
  );
}

const styles = {
  modal: {
    maxHeight: "70%",
  },
};

export default DocumentsTable;
