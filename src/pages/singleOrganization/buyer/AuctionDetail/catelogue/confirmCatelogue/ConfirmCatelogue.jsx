import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import CatelogeSellerProfile from "./components/CatelogeSellerProfile";
import CatelogueAuctionDetailTable from "./table/CatelogueAuctionDetailTable";
import ContactDetails from "./components/ContactDetails";
import ContactPerson from "./table/ContactPersonTable";
import AuctionPropertyTable from "./table/AuctionPropertyTable";
import SellerTermAndCondition from "./components/SellerTermAndCondition";
import OnlineTermAndCondition from "./components/OnlineTermAndCondition";
import CataloguePdf from "./downloadPdf/CataloguePdf";
import ViewLotsImage from "../editAndView/children/ViewLotsImage";


function ConfirmCatelogue({ setEditCatelogue, catelogueInformation }) {
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const isDastop = useMediaQuery({ query: "(max-width: 1550px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1230px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });

  return (
    <>
      <div
        id="catalogue-detail"
        className={`pin-top ${
          isDastop ? "" : "container"
        } cover white text-center flex column `}
        style={{
          padding: isMobile ? "1rem" : isLaptop ? "2rem " : "2rem 4rem",
          gap: "1.5rem",
        }}
      >
        <div className="flex">
          <span
            className="material-icons-outlined pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
        </div>
        <div
          ref={contentRef}
          className="pdf-section  flex column"
          style={{ gap: "1.5rem" }}
        >
          <CatelogeSellerProfile catelogueInformation={catelogueInformation} />
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            SCHEDULE OF PROGRAMME
          </p>
          <CatelogueAuctionDetailTable
            catelogueInformation={catelogueInformation}
          />
          {/* <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            Membership Details
          </p>
          <MembershipDetail catelogueInformation={catelogueInformation} /> */}
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            Contact Details
          </p>
          <ContactDetails catelogueInformation={catelogueInformation} />
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            Contact officials at Cerclex Pvt. Ltd
          </p>
          <ContactPerson catelogueInformation={catelogueInformation} />
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            DETAILS OF AUCTION PROPERTY
          </p>
          <AuctionPropertyTable catelogueInformation={catelogueInformation} />
          <ViewLotsImage catelogueInformation={catelogueInformation}/>
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            SELLER TERMS & CONDITIONS
          </p>
          <SellerTermAndCondition catelogueInformation={catelogueInformation} />
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            TERMS & CONDITIONS OF THE ONLINE AUCTION
          </p>
          <OnlineTermAndCondition catelogueInformation={catelogueInformation} />
        </div>
        <p
          className="select-label cover pointer"
          style={{ right: isMobile ? "20px" : "50px",padding:"5px 10px" }}
          onClick={() => setEditCatelogue(true)}
        >
        
          <span
            className="material-icons-outlined font-16px"
          >
            edit
          </span>
          <span className="font-16px">Edit</span>
        </p>
      </div>
      <div className="flex justify-center mt-1">
        <CataloguePdf catelogueInformation={catelogueInformation} />
      </div>
    </>
  );
}

export default ConfirmCatelogue;
