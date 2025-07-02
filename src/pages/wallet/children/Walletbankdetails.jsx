import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  unverifyWalletAccount,
  verifyWalletAccount,
} from "../../../redux/action/wallet";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

function Walletbankdetails({ bankDetail, setIsModalOpen }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { bankVerifyLoading ,bankUnVerifyLoading} = useSelector((state) => state.tradersWallet);
  const ignoredKeys = ["_id", "createdAt", "updatedAt", "__v", "verified"];
  const keyMapping = {
    "Account Number": "accountNo",
    "IFSC code": "IFCSCode",
    "Bank Name": "bankName",
    "Account Holder's name": "holderName",
    branch: "bankBranch",
  };

  const bankDetailsTable = Object.entries(bankDetail)
    .filter(([key]) => !ignoredKeys.includes(key))
    .map(([key, value]) => {
      const newKey = Object.keys(keyMapping).find((k) => keyMapping[k] === key);
      return { newKey: newKey || key, value: value };
    });

  const verifiedAccount = () => {
    dispatch(verifyWalletAccount(bankDetail._id, id)).then(() => {
      setIsModalOpen(false);
    });
  };

  const unverifiedAccount = () => {
    dispatch(unverifyWalletAccount(bankDetail._id, id)).then(() => {
      setIsModalOpen(false);
    });
  };

  return (
    <div className="">
      <div className="valign-wrapper space-between">
        <b className="font-25px">Bank Details</b>
        <span className="material-icons-outlined pointer modal-close">
          close
        </span>
      </div>
      <div className={`p-1 flex justify-center column`}>
        <div>
          <span
            className="valign-wrapper justify-center"
            style={{ gap: "10px" }}
          >
            <span>
              <b className="font-20px">
                {bankDetail.holderName}-{String(bankDetail.accountNo).slice(-5)}
              </b>
              <p className="cercle-purple-text">
                Your account is{" "}
                {bankDetail.verified ? "verified" : "not verified"}
              </p>
            </span>
            {bankDetail.verified && (
              <img
                src={`${process.env.PUBLIC_URL}/icons/Icon.svg`}
                alt="Icon"
                style={{ width: "25px", height: "25px" }}
              />
            )}
          </span>
          <div className="table-container mt-2 mb-2">
            <table className="custom-table">
              <tbody>
                {bankDetailsTable.map((row, index) => (
                  <tr key={index} style={{ display: "grid-2" }}>
                    <th>{row?.newKey}</th>
                    <td>{row?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="valign-wrapper justify-center gap-1">
        <button
          className="green btn-small font-14px"
          onClick={() => verifiedAccount(bankDetail?._id)}
          disabled={bankVerifyLoading || bankDetail.verified}
        >
          {bankVerifyLoading ? <ClipLoader color="red" size={20} /> : "Verify"}
        </button>
        <button
          className="red btn-small font-14px"
          onClick={() => unverifiedAccount(bankDetail?._id)}
          disabled={bankUnVerifyLoading || !bankDetail.verified}
        >
           {bankUnVerifyLoading ? <ClipLoader color="red" size={20} /> : "Reject"} 
        </button>
      </div>
    </div>
  );
}

export default Walletbankdetails;
