import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import { useMediaQuery } from "react-responsive";
import { globalContext } from "../../../../../../../context/ContextProvider";
import BuyerInformation from "./component/BuyerInformation";
import ReverseAuctionForProcurement from "./component/ReverseAuctionForProcurement";
import ReverseLocationDetails from "./component/ReverseLocationDetails.jsx";
import ReverseContactDetail from "./component/ReverseContactDetail.jsx";
import ReverseProductList from "./component/ReverseProductList.jsx";
import TermsAndCondition from "./component/TermsAndCondition.jsx";
import GeneralTermAndCondition from "./component/GeneralTermAndCondition.jsx";
import { useSelector } from "react-redux";
import ReverseServiceLotList from "./component/ReverseServiceLotList.jsx";

function ReverseCatalogueViewAndEdit({ setEditReverseCatelogue }) {
  const navigate = useNavigate();
  const collapsible_ref = useRef(null);
  const isTablet = useMediaQuery({ query: "(max-width: 750px)" });
  const [selectAllItems, setSelectAllItems] = useState(false);
  const { singleAuctionData } = useSelector((state) => state.singleAuction);
  const {
    setSelectcheckboxItem,
    reverseCatalogueInformation,
    setReverseCatalogueInformation,
    selectcheckboxItem,
  } = useContext(globalContext);

  const [expandedItems, setExpandedItems] = useState({
    buyer: false,
    auction: false,
    procurement: false,
    contactDetails: false,
    productList: false,
    termsAndCondition: false,
    generalTerms: false,
  });

  const allChecked = Object.values(selectcheckboxItem).every(Boolean);

  useEffect(() => {
    const instance = M.Collapsible.init(collapsible_ref.current, {
      onOpenStart: (el) => {
        setExpandedItems((pre) => ({ ...pre, [el.id]: true }));
      },
      onCloseStart: (el) => {
        setExpandedItems((pre) => ({ ...pre, [el.id]: false }));
      },
    });

    return () => {
      if (instance && instance.destroy) {
        instance.destroy();
      }
    };
  }, []);

  const handleSelectAll = () => {
    setSelectAllItems((prev) => !prev);
    setSelectcheckboxItem((prev) => {
      const newState = !selectAllItems
        ? {
          buyerCheckbox: true,
          auctionCheckbox: true,
          procurementCheckbox: true,
          contactDetailsCheckbox: true,
          propertyCheckbox: true,
          termsCheckbox: true,
          generalTermsCheckbox: true,
        }
        : {
          buyerCheckbox: false,
          auctionCheckbox: false,
          procurementCheckbox: false,
          contactDetailsCheckbox: false,
          propertyCheckbox: false,
          termsCheckbox: false,
          generalTermsCheckbox: false,
        };
      return newState;
    });
  };

  useEffect(() => {
    if (allChecked) {
      setSelectAllItems(true);
    } else {
      setSelectAllItems(false);
    }
  }, [selectcheckboxItem]);

  return (
    <div
      className={`cover ${isTablet ? "p-1" : "p-2"} white mt-1`}
      style={{ minHeight: "80vh" }}
    >
      <div className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Create Catalogue</h4>
      </div>
      <div
        style={{
          width: isTablet ? "100%" : "84%",
          margin: "auto",
          marginTop: "3rem",
        }}
      >
        <span className="valign-wrapper gap-1" style={{ paddingLeft: "32px" }}>
          <span
            className="material-icons-outlined blue-text pointer font-25px"
            onClick={handleSelectAll}
          >
            {selectAllItems ? "check_box" : "check_box_outline_blank"}
          </span>
          <p className="font-18px blue-text">Select All</p>
        </span>
        <div className="mt-1">
          <ul
            className="collapsible flex column gap-1"
            ref={collapsible_ref}
            style={{ border: "none", borderRadius: "8px" }}
          >
            <BuyerInformation
              itemOpens={expandedItems?.buyer}
              id={"buyer"}
              setReverseCatalogueInformation={setReverseCatalogueInformation}
              reverseCatalogueInformation={reverseCatalogueInformation}
            />
            <ReverseLocationDetails
              itemOpens={expandedItems?.auction}
              id={"auction"}
              setReverseCatalogueInformation={setReverseCatalogueInformation}
              reverseCatalogueInformation={reverseCatalogueInformation}
            />
            <ReverseAuctionForProcurement
              itemOpens={expandedItems?.procurement}
              id={"procurement"}
              setReverseCatalogueInformation={setReverseCatalogueInformation}
              reverseCatalogueInformation={reverseCatalogueInformation}
            />
            <ReverseContactDetail
              itemOpens={expandedItems?.contactDetails}
              id={"contactDetails"}
              setReverseCatalogueInformation={setReverseCatalogueInformation}
              reverseCatalogueInformation={reverseCatalogueInformation}
            />
            {singleAuctionData?.auctionType === "reverseAuctionService" ? (
              <ReverseServiceLotList
                itemOpens={expandedItems?.productList}
                id={"productList"}
                setReverseCatalogueInformation={setReverseCatalogueInformation}
                reverseCatalogueInformation={reverseCatalogueInformation}
              />
            ) : (
              <ReverseProductList
                itemOpens={expandedItems?.productList}
                id={"productList"}
                setReverseCatalogueInformation={setReverseCatalogueInformation}
                reverseCatalogueInformation={reverseCatalogueInformation}
              />
            )}
            <TermsAndCondition
              itemOpens={expandedItems?.termsAndCondition}
              id={"termsAndCondition"}
              setReverseCatalogueInformation={setReverseCatalogueInformation}
              reverseCatalogueInformation={reverseCatalogueInformation}
            />
            <GeneralTermAndCondition
              itemOpens={expandedItems?.generalTerms}
              id={"generalTerms"}
              setReverseCatalogueInformation={setReverseCatalogueInformation}
              reverseCatalogueInformation={reverseCatalogueInformation}
            />
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <button
          className={`button-style pointer font-20px select-wrapper ${allChecked ? "cercle-purple white-text" : "grey lighten-2 "
            }`}
          style={{ padding: "8px 30px" }}
          onClick={() => setEditReverseCatelogue(false)}
          disabled={!allChecked}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ReverseCatalogueViewAndEdit;
