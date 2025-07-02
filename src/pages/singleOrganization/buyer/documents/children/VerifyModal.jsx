import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { VerifyDocument } from "../../../../../redux/action/document";


function VerifyModal({ fileData, setConfirmModalOpen, setFileData }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleVerifyFile = () => {
    dispatch(VerifyDocument(id, fileData?.fileId)).then(() => {
      setFileData("");
      setConfirmModalOpen(false);
    });
  };
  return (
    <div>
      <h5 className="normal-size">Confirm to verify </h5>
      <p className="semi-bold">
        Are you sure to confirm <b>{fileData?.fileName}</b>
      </p>
      <div className="flex justify-end gap-1">
        <button className="green btn-small " onClick={handleVerifyFile}>
          Yes
        </button>

        <button
          className="red btn-small"
          onClick={() => setConfirmModalOpen(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default VerifyModal;
