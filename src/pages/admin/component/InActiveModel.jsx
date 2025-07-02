import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockAdminAccount } from "../../../redux/action/admin";
import { ClipLoader } from "react-spinners";

function InActiveModel({ setInactiveOpenModal, clickUser }) {
  const dispatch = useDispatch();
  const { adminLoading } = useSelector((state) => state.admin);

  const handleInactivate = () => {
    dispatch(blockAdminAccount(clickUser._id,setInactiveOpenModal));
  };

  return (
    <div className="">
      <h4 className="">
        Confirm Account Inactivation of{" "}
        <span className="red-text">{clickUser.name} </span>( {clickUser?.email}{" "}
        )
      </h4>
      <p className="mt-1">
        Are you sure you want to inactivate {clickUser?.name} account? <br />{" "}
        This action may result in the loss of access to certain features and
        data. Once inactivated, This account will no longer be able to access
        the admin dashboard.
      </p>
      <div className="flex justify-end gap-1 mt-1">
        <button className="green btn-small" onClick={handleInactivate}>
          {" "}
          {adminLoading ? <ClipLoader color="red" size={20} /> : "Yes"}
        </button>
        <button
          className="red btn-small modal-close"
          onClick={() => setInactiveOpenModal(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default InActiveModel;
