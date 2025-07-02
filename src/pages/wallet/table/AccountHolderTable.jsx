import React, { useEffect, useState } from "react";
import { Modal } from "react-materialize";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../commanPage/paginationUi/Pagination";
import { getTraderWallet } from "../../../redux/action/wallet";
import { useParams } from "react-router-dom";
import Walletbankdetails from "../children/Walletbankdetails";
import TableLoader from "../../commanPage/loader/TableLoader";
import { NoItemsLeftInTable } from "../../../helper/helpers";

function AccountHolderTable() {
  const totalNumberRow = 30;
  const { id } = useParams();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const dispatch = useDispatch();
  const [personalDetails, setPersonalDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountDetailTable, setAccountDetailTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { tradersWalletLoading, traderWallet } = useSelector(
    (state) => state.tradersWallet
  );

  const viewDetailsFunctionality = (items) => {
    setPersonalDetails(items);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getTraderWallet(id));
  }, [dispatch, id]);

  useEffect(() => {
    setAccountDetailTable(traderWallet?.bankAccounts?.reverse());
  }, [traderWallet]);

  if (tradersWalletLoading) {
    return <div className="valign-wrapper justify-center cover white">
      <TableLoader
        headerData={[
          "Account Number",
          "Bank name",
          "IFSC code",
          "Branch",
          "Name",
          "Status",
          "Actions",
        ]}
      />
    </div>
  }

  return (
    <div>
      <div className={`table-container-style z-depth-1`}>
        <table
          className={`responsive-table centered ${isTablet ? "auction_table table-style" : "custom-table-style"
            } `}
        >
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Bank name</th>
              <th>IFSC code</th>
              <th>Branch</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accountDetailTable
              ?.slice(currentPage, currentPage + totalNumberRow)
              ?.map((items, index) => (
                <tr key={items.id} className="text-bold">
                  <td>{items?.accountNo}</td>
                  <td>{items?.bankName}</td>
                  <td>{items?.IFCSCode}</td>
                  <td>{items?.bankBranch}</td>
                  <td>{items?.holderName}</td>

                  <td>
                    <span
                      className="valign-wrapper justify-center"
                      style={{ gap: "10px" }}
                    >
                      <span>
                        {" "}
                        {items.verified ? "Verified" : "Not Verified"}
                      </span>
                      {items?.verified ? (
                        <img
                          src={`${process.env.PUBLIC_URL}/icons/Icon.svg`}
                          alt="Icon"
                          style={{ width: "18px", height: "18px" }}
                        />
                      ) : (
                        <img
                          src={`${process.env.PUBLIC_URL}/icons/info-circle.svg`}
                          alt="Icon"
                          className="pointer "
                          style={{ width: "20px", height: "20px" }}
                        />
                      )}
                    </span>
                  </td>
                  <td>
                    <span
                      className="material-icons-outlined pointer cercle-purple-text"
                      onClick={() => viewDetailsFunctionality(items)}
                    >
                      visibility
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {accountDetailTable?.length === 0 && <NoItemsLeftInTable />}
      </div>

      {accountDetailTable?.length !== 0 && (
        <Pagination
          Data={accountDetailTable}
          totalNumberRow={totalNumberRow}
          setCurrentPage={setCurrentPage}
        />
      )}

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalAccount-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <Walletbankdetails bankDetail={personalDetails} setIsModalOpen={setIsModalOpen}/>
      </Modal>

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalAccountUpdate"
        open={false}
      >
        {/* <WalletUpdateBank /> */}
      </Modal>
    </div>
  );
}

export default AccountHolderTable;
