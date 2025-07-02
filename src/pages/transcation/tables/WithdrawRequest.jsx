import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Pagination from "../../commanPage/paginationUi/Pagination";
import { capitalizeFirstLetter, convertTo12HourFormat } from "../../../helper/helpers";
import TripleSwitchButton from "../component/TripleSwitchButton";
import { useDispatch, useSelector } from "react-redux";
import { confirmWithdrawalAccount, getAllWithdrawalRequestAccounts } from "../../../redux/action/wallet";
import { useNavigate } from "react-router-dom";
import TableLoader from "../../commanPage/loader/TableLoader";

function WithdrawRequest({ searchData }) {
  const navigate = useNavigate();
  const totalNumberRow = 100;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const { withdrawalAccounts, withdrawalRequestLoading } = useSelector((state) => state.withdrawalRequest);
  const [selectedApprovalAccount, setSelectedApprovalAccount] = useState([]);
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [initialSearchData, setInitialSearchData] = useState([]);
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });

  const handleSelectAccount = (accountDetails) => {
    if (accountDetails.status !== "approved") return;

    if (selectedApprovalAccount.some((acc) => acc?._id === accountDetails?._id)) {
      setSelectedApprovalAccount((prev) =>
        prev.filter((acc) => acc._id !== accountDetails._id)
      );
    } else {
      setSelectedApprovalAccount((prev) => [...prev, accountDetails]);
    }
  };

  const handleSubmitToProceed = () => {
    dispatch(confirmWithdrawalAccount(selectedApprovalAccount, navigate)).then(
      () => setSelectedApprovalAccount([])
    );
  };

  useEffect(() => {
    if (searchData?.trim()) {
      const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
      };

      const filteredData = initialSearchData?.filter((item) =>
        [
          "organization.organizationName",
          "bankAccountDetails.bankName",
          "bankAccountDetails.accountNo",
          "status",
        ].some((field) =>
          getNestedValue(item, field)?.toLowerCase()?.includes(searchData?.trim()?.toLowerCase())
        )
      );


      setWithdrawalData(filteredData);
    } else {
      setWithdrawalData(initialSearchData);
    }
  }, [searchData, initialSearchData]);

  useEffect(() => {
    if (withdrawalData?.length === 0) {
      setSelectedApprovalAccount([]);
    }
  }, [withdrawalData]);

  useEffect(() => {
    dispatch(getAllWithdrawalRequestAccounts());
  }, [dispatch]);

  useEffect(() => {
    setWithdrawalData(withdrawalAccounts);
    setInitialSearchData(withdrawalAccounts);
  }, [withdrawalAccounts]);


  if (withdrawalRequestLoading) {
    return <div className="valign-wrapper justify-center cover white mt-1">
      <TableLoader
        headerData={[
          "Organisation Name",
          "Bank Name",
          "Account No",
          "Date",
          "Amount",
          "Actions",
        ]}
      />
    </div>
  }

  return (
    <>
      <div className={`mt-1 ${!isTablet && "table-container-style"}`}>
        <table
          className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Organisation Name</th>
              <th>Bank Name</th>
              <th>Account No</th>
              {/* <th>IFSC code</th> */}
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawalData
              ?.slice(currentPage, currentPage + totalNumberRow)
              ?.map((items, index) => (
                <tr
                  className={`${items?.status === "completed" ? "grey lighten-4" : "white"
                    } black-text`}
                  key={items?._id}
                >
                  <td>
                    <span
                      className="material-symbols-outlined pointer cercle-purple-text"
                      style={{ opacity: items?.status !== "approved" && 0.3 }}
                      onClick={() => handleSelectAccount(items)}
                    >
                      {items?.status === "completed" ? (
                        "check_box"
                      ) : (
                        <span
                          className="material-symbols-outlined pointer cercle-purple-text"
                          style={{
                            opacity: items?.status !== "approved" && 0.3,
                          }}
                        >
                          {selectedApprovalAccount?.some(
                            (acc) => acc?._id === items?._id
                          )
                            ? "check_box"
                            : "check_box_outline_blank"}
                        </span>
                      )}
                    </span>
                  </td>
                  <td>{items?.organization?.organizationName}</td>
                  <td>{items?.bankAccountDetails?.bankName}</td>
                  <td>{items?.bankAccountDetails?.accountNo}</td>
                  {/* <td>{items?.bankAccount?.ifsc}</td> */}
                  <td>
                    <span>
                      {new Date(items?.updatedAt).toLocaleDateString("en-GB")}
                    </span>
                    <span> {convertTo12HourFormat(items?.updatedAt)}</span>
                  </td>
                  <td>{Math.abs(items.amount)}</td>
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
                  <td
                    style={{
                      width: "160px",
                    }}
                  >
                    <TripleSwitchButton withdrawalDerails={items} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {(!withdrawalData || withdrawalData?.length === 0) && (
          <div className="full-width column grey-text p-1 noItems-height flex align-center justify-center ">
            <span className="material-symbols-outlined large-size ">
              receipt_long
            </span>
            <p>No data found.</p>
          </div>
        )}
      </div>
      {selectedApprovalAccount?.length !== 0 && (
        <div className=" flex justify-center">
          <button
            className={`button-style mt-1 pointer white-text cercle-purple`}
            style={{ padding: "8px 30px" }}
            disabled={selectedApprovalAccount?.length === 0}
            onClick={handleSubmitToProceed}
          >
            Proceed
          </button>
        </div>
      )}
      <Pagination
        Data={withdrawalAccounts || []}
        totalNumberRow={totalNumberRow}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default WithdrawRequest;
