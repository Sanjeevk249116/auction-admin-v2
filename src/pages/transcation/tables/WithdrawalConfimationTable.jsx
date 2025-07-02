import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  capitalizeFirstLetter,
  convertTo12HourFormat,
} from "../../../helper/helpers";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function WithdrawalConfimationTable({
  confirmSelectedAccount,
  setConfirmSelectedAccount,
  selectedAccount,
  handleSubmitToProceed,
}) {
  const [confirmWithdrawalData, setConfirmWithdrawalData] =
    useState(selectedAccount);
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
   const { otpRequestLoading } = useSelector((state) => state.withdrawalRequest);

  const handleSelectAccount = (accountDetails) => {
    if (accountDetails.status !== "approved") return;

    if (
      confirmSelectedAccount.some((acc) => acc?._id === accountDetails?._id)
    ) {
      setConfirmSelectedAccount((prev) =>
        prev.filter((acc) => acc._id !== accountDetails._id)
      );
    } else {
      setConfirmSelectedAccount((prev) => [...prev, accountDetails]);
    }
  };

  useEffect(() => {
    setConfirmWithdrawalData(selectedAccount);
  }, [selectedAccount]);


  return (
    <>
      <div className={`mt-1 ${!isTablet && "table-container-style"}`}>
        <table
          className={`responsive-table centered ${
            isTablet ? "auction_table table-style" : "custom-table-style"
          } `}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Organisation Name</th>
              <th>Bank Name</th>
              <th>Account No</th>
              <th>IFSC code</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="white">
            {confirmWithdrawalData?.map((items, index) => (
              <tr
                className={`${
                  items?.status === "completed" ? "grey lighten-4" : "white"
                } black-text`}
                key={items?._id}
              >
                <td>
                  <span
                    className="material-symbols-outlined pointer cercle-purple-text"
                    onClick={() => handleSelectAccount(items)}
                  >
                    <span className="material-symbols-outlined pointer cercle-purple-text">
                      {confirmSelectedAccount?.some(
                        (acc) => acc?._id === items?._id
                      )
                        ? "check_box"
                        : "check_box_outline_blank"}
                    </span>
                  </span>
                </td>
                <td>{items?.organization?.organizationName}</td>
                <td>{items?.bankAccountDetails?.bankName}</td>
                <td>{items?.bankAccountDetails?.accountNo}</td>
                <td>{items?.bankAccountDetails?.IFCSCode}</td>
                <td>
                  <span>
                    {new Date(items?.updatedAt).toLocaleDateString("en-GB")}
                  </span>
                  <span> {convertTo12HourFormat(items?.updatedAt)}</span>
                </td>
                <td>{Math.abs(items?.amount)}</td>
                <td>
                  <span
                    style={{
                      color:
                        items?.status === "approved"
                          ? "green"
                          : items?.status === "rejected"
                          ? "red"
                          : items?.status === "failed"
                          ? "red"
                          : items?.status === "completed"
                          ? "purple"
                          : "orange",
                    }}
                  >
                    {capitalizeFirstLetter(items.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirmSelectedAccount?.length !== 0 && (
        <div className=" flex justify-center">
          <button
            className={`button-style mt-1 pointer white-text cercle-purple`}
            style={{ padding: "8px 30px" }}
            disabled={confirmSelectedAccount?.length === 0}
            onClick={handleSubmitToProceed}
          >
              {otpRequestLoading ? <ClipLoader color="white" size={20} /> : "Confirm and Proceed"}
          </button>
        </div>
      )}
    </>
  );
}

export default WithdrawalConfimationTable;
