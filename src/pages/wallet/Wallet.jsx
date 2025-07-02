import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll } from "react-scroll";
import "react-datepicker/dist/react-datepicker.css";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-materialize";
import { Tabs, Tab } from "react-materialize";
import RecentTransactions from "./table/RecentTransactions";
import Withdrawals from "./table/Withdrawals";
import WalletAddBank from "./components/WalletAddBank";
import BankDetailInHomePage from "./components/BankDetailInHomePage";
import SpinnersLoading from "../commanPage/loader/SpinnersLoading";
import { getTraderWallet } from "../../redux/action/wallet";
import EmdTranscationTable from "./table/EmdTranscationTable";

function Wallet() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
  const navigate = useNavigate();
  const { tradersWalletLoading, traderWallet } = useSelector(
    (state) => state.tradersWallet
  );
  useEffect(() => {
    animateScroll.scrollToTop({ smooth: true });
  });

  useEffect(() => {
    dispatch(getTraderWallet(id));
  }, [dispatch, id]);

  if (tradersWalletLoading) {
    return (
      <div>
        <h3>Wallet</h3>
        <SpinnersLoading />
      </div>
    );
  }

  function addBankDataFetching(obj) {
    // dispatch(addedBankDetailsAction(obj))
    //   .then(() => dispatch(getWalletAction()))
    //   .then(() => {
    //     const locationModal = document.getElementById("modalAccount");
    //     const instance = window.M.Modal.getInstance(locationModal);
    //     instance.close();
    //   });
  }


  return (
    <div className="mt-1">
      <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Wallet</h4>
      </span>

      <div
        className={`mt-1 wallet-container mb-2 full-width gap-2  flex ${
          isTablet ? "column" : ""
        }`}
      >
        <div
          className={`cover  full-width white p-2 slide-in`}
          style={{
            width: !isTablet && "55%",
            height: traderWallet?.bankAccounts?.length <= 1 && "250px",
          }}
        >
          <div
            className={`cover  border valign-wrapper gap-1  justify-center full-width `}
            style={{
              height: "100%",
            }}
          >
            <img
              className="circle border"
              style={{ padding: "16px", backgroundColor: "#f6ecff " }}
              src={`${process.env.PUBLIC_URL}/icons/wallet-2.svg`}
              alt="Icon"
            />

            <span>
              <b className="cercle-purple-text font-20px">Wallet Balance</b>
              <p
                className="black-text font-25px font-cercular-bold"
                style={{ marginTop: "-5px" }}
              >
                {" "}
                ₹ {traderWallet?.availableBalance || "000"}
              </p>
            </span>
          </div>
        </div>

        <div className="cover full-width white ">
          <div className="valign-wrapper space-between p-1">
            <span className="valign-wrapper gap-1">
              <img
                src={`${process.env.PUBLIC_URL}/icons/bank.svg`}
                alt="Icon"
              />
              <span
                className={`${
                  isMobile ? "font-16px" : "font-20px"
                } cercle-purple-text`}
                style={{ marginTop: "5px" }}
              >
                Your Bank Accounts
              </span>
            </span>
            {/* <button
              className={`modal-trigger white valign-wrapper ${
                isMobile ? "font-16px" : "font-18px"
              }  pointer bold  border-radius-12`}
              style={{
                padding: isMobile ? "0.5rem" : "0.5rem 1rem",
                border: "1px dashed black",
              }}
              href="#modalAccount"
            >
              <span className="material-symbols-outlined">add</span>
              <p className="">Add Bank</p>
            </button> */}
          </div>
          <hr />

          {traderWallet?.bankAccounts
            ?.slice(-2)
            .reverse()
            .map((item, index) => {
              return <BankDetailInHomePage item={item} key={index} />;
            })}

          {traderWallet?.bankAccounts?.length > 2 && (
            <p
              className="flex justify-center mt-1 mb-1 cercle-purple-text pointer"
              style={{ textDecoration: "underLine" }}
              onClick={() => navigate(`/wallet/wallet-account/${id}`)}
            >
              View all
            </p>
          )}
          {(!traderWallet ||
            !traderWallet.bankAccounts ||
            traderWallet.bankAccounts.length === 0) && (
            <p
              className={`valign-wrapper justify-center ${
                isTablet ? "mt-2 mb-2" : "mt-3 mb-4"
              } cercle-purple-text pointer`}
            >
              No Bank Account Added
            </p>
          )}
        </div>
      </div>

      <Tabs>
        <Tab title="Recent Transactions">
          <RecentTransactions recentTransaction={traderWallet?.transactions} />
        </Tab>

        <Tab title="Withdrawals">
          <Withdrawals withdrawals={traderWallet?.withdrawalHistory} />
        </Tab>

        <Tab title="Emd Transactions">
          <EmdTranscationTable EmdTranscationCollection={traderWallet?.emdTransactions} />
        </Tab>

        {/* <Tab title="Refund">
          <Refund refundHistory={traderWallet?.refundHistory} />
        </Tab> */}
      </Tabs>

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalAccount"
        open={false}
      >
        <WalletAddBank
          addBankDataFetching={addBankDataFetching}
          loading={tradersWalletLoading}
        />
      </Modal>
    </div>
  );
}

export default Wallet;
