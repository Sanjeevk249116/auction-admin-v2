import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { rejectDocument } from "../../../../../redux/action/document";
import { ClipLoader } from "react-spinners";

function RejectModal({ fileData, setRejectModalOpen, setFileData }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((pre) => pre.allDocuments);
  const [rejectReason, setRejectReason] = useState("");
  const handleRejectFile = () => {
    dispatch(rejectDocument(id, fileData?.fileId, rejectReason)).then(() => {
      setFileData("");
      setRejectModalOpen(false);
      setRejectReason("")
    });
  };
  return (
    <div>
      <h5 className="normal-size">Confirm to reject </h5>
      <p className="semi-bold">
        Are you sure to reject <b className="red-text">{fileData?.fileName}</b>
      </p>
      <div className="mt-1">
        <p className="semi-bold">Please provide a reason for rejection:</p>
        <textarea
          className="border-radius-12"
          rows="5"
          name="reason"
          value={rejectReason}
          style={{
            border: "10px solid transparent",
            outline: "2px solid transparent",
            minHeight: "100px",
            backgroundColor: "#f2f4fd",
          }}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Enter your reason here..."
        ></textarea>
      </div>
      <div className="flex justify-end gap-1 mt-1">
        <button className="green btn-small" disabled={rejectReason === ""} onClick={handleRejectFile}>
          {loading ? <ClipLoader color="red" size={20} /> : "Submit"}
        </button>

        <button
          className="red btn-small modal-close"
          onClick={() => setRejectModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RejectModal;
