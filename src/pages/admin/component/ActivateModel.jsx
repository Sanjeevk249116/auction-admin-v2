import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unBlockAdminAccount } from "../../../redux/action/admin";
import { ClipLoader } from "react-spinners";

function ActivateModel({ clickUser, setActiveOpenModal }) {
  const dispatch = useDispatch();
  const { adminLoading } = useSelector((state) => state.admin);

  const handleActivate = () => {
    dispatch(unBlockAdminAccount(clickUser?._id,setActiveOpenModal));
  };
  return (
    <div className="">
      <h4 className="">
        Confirm Account Activation of{" "}
        <span className="green-text">{clickUser?.name} </span>({" "}
        {clickUser?.email} )
      </h4>
      <p className="mt-1">
        Are you sure you want to activate this account? <br />
        Once activated, the user will regain access to all features, including
        every actions in **admin dashboard**.
      </p>
      <div className="flex justify-end gap-1 mt-1">
        <button className="green btn-small" onClick={handleActivate}>
          {adminLoading ? <ClipLoader color="red" size={20} /> : "Yes"}
        </button>
        <button
          className="red btn-small modal-close"
          onClick={() => setActiveOpenModal(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default ActivateModel;
