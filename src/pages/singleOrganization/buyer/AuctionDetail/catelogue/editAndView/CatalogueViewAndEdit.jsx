import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";
import SellerInformation from "./components/SellerInformation";
import AuctionInformation from "./components/AuctionInformation";
import PlatformAndContactDetails from "./components/PlatformAndContactDetails";
import AuctionProperty from "./components/AuctionProperty";
import TermsAndCondition from "./components/TermsAndCondition";
import OnlineAuctionCondition from "./components/OnlineAuctionCondition";
import { globalContext } from "../../../../../../context/ContextProvider";
import { useMediaQuery } from "react-responsive";

function CatalogueViewAndEdit({ setEditCatelogue }) {
  const navigate = useNavigate();
  const collapsible_ref = useRef(null);
  const isTablet = useMediaQuery({ query: "(max-width: 750px)" });
  const [selectAllItems, setSelectAllItems] = useState(false);
  const {
    setSelectcheckboxItem,
    catelogueInformation,
    setCatelogueInformation,
    selectcheckboxItem,
  } = useContext(globalContext);

  const [expandedItems, setExpandedItems] = useState({
    seller: false,
    auction: false,
    platform: false,
    auctionProperties: false,
    sellerTermAndCondition: false,
    onlineAuctionCondition: false,
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
            sellerCheckbox: true,
            auctionCheckbox: true,
            platformCheckbox: true,
            propertyCheckbox: true,
            termsCheckbox: true,
            onlineAuctionCheckbox: true,
          }
        : {
            sellerCheckbox: false,
            auctionCheckbox: false,
            platformCheckbox: false,
            propertyCheckbox: false,
            termsCheckbox: false,
            onlineAuctionCheckbox: false,
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
            <SellerInformation
              itemOpens={expandedItems?.seller}
              id={"seller"}
              setCatelogueInformation={setCatelogueInformation}
              catelogueInformation={catelogueInformation}
            />
            <AuctionInformation
              itemOpens={expandedItems?.auction}
              id={"auction"}
              setCatelogueInformation={setCatelogueInformation}
              catelogueInformation={catelogueInformation}
            />
            <PlatformAndContactDetails
              itemOpens={expandedItems?.platform}
              id={"platform"}
              setCatelogueInformation={setCatelogueInformation}
              catelogueInformation={catelogueInformation}
            />
            <AuctionProperty
              itemOpens={expandedItems?.auctionProperties}
              id={"auctionProperties"}
              setCatelogueInformation={setCatelogueInformation}
              catelogueInformation={catelogueInformation}
            />
            <TermsAndCondition
              itemOpens={expandedItems?.sellerTermAndCondition}
              id={"sellerTermAndCondition"}
              setCatelogueInformation={setCatelogueInformation}
              catelogueInformation={catelogueInformation}
            />
            <OnlineAuctionCondition
              itemOpens={expandedItems?.onlineAuctionCondition}
              id={"onlineAuctionCondition"}
              setCatelogueInformation={setCatelogueInformation}
              catelogueInformation={catelogueInformation}
            />
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <button
          className={`button-style pointer font-20px select-wrapper ${
            allChecked ? "cercle-purple white-text" : "grey lighten-2 "
          }`}
          style={{ padding: "8px 30px" }}
          onClick={() => setEditCatelogue(false)}
          disabled={!allChecked}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CatalogueViewAndEdit;
