import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import WalletAddBank from "./WalletAddBank";
import AccountHolderTable from "../table/AccountHolderTable";

function WalletAccount() {
  const dispatch = useDispatch();
  const loading = false;
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const navigate = useNavigate();

  function addBankDataFetching(obj) {
    // dispatch(
    //   addedBankDetailsAction(obj, () => {
    //     const locationModal = document.getElementById("modalAccount");
    //     const instance = window.M.Modal.getInstance(locationModal);
    //     instance.close();
    //   })
    // );
  }

  return (
    <div className="mt-1">
      <div
        className={` ${
          isMobile ? "flex column gap-1" : "valign-wrapper "
        } space-between `}
        style={{ marginBottom: "14px" }}
      >
        <span className="valign-wrapper" style={{ gap: "25px", flex: "0.97" }}>
          <span
            class="material-icons-outlined pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>

          <h4 className="margin-0px">Your Account</h4>
        </span>
        {/* <span
          className="cover modal-trigger white valign-wrapper gap-1 valign-wrapper justify-center pointer bold font-18px"
          style={{ padding: "0.5rem 2rem" }}
          href="#modalAccount"
        >
          <span className="material-symbols-outlined">add</span>
          <b className="">Add Bank</b>
        </span> */}
      </div>
      <AccountHolderTable />
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
          loadings={loading}
        />
      </Modal>
    </div>
  );
}

export default WalletAccount;
