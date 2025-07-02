import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import BuyerInfo from "./component/BuyerInfo";
import ServiceSupportDetail from "./component/ServiceSupportDetail";
import CatelogueAuctionDetailTable from "../../confirmCatelogue/table/CatelogueAuctionDetailTable";
import ContactDetails from "./component/ContactDetails";
import ReverseAuctionProductTable from "../ReverseViewAndEdit/table/ReverseAuctionProductTable";
import { useSelector } from "react-redux";
import ReverseServiceLotTable from "../ReverseViewAndEdit/table/ReverseServiceLotTable";
import TermsAndCondition from "./component/TermsAndCondition";
import ContactPersonTable from "../../confirmCatelogue/table/ContactPersonTable";
import ReverseCatalogueDownload from "../confirmDownload/ReverseCatalogueDownload";
import ViewLotsImage from "../../editAndView/children/ViewLotsImage";

function ConFirmReverseCatalogue({
  setEditReverseCatelogue,
  reverseCatalogueInformation,
}) {
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const { singleAuctionData } = useSelector((state) => state.singleAuction);
  const isDastop = useMediaQuery({ query: "(max-width: 1550px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1230px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
  return (
    <>
      <div
        id="catalogue-detail"
        className={`pin-top ${isDastop ? "" : "container"
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
          <BuyerInfo
            reverseCatalogueInformation={reverseCatalogueInformation}
          />
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            Online auction platform and support services provided by Infinite
            Cercle Private limited
          </p>
          <ServiceSupportDetail
            reverseCatalogueInformation={reverseCatalogueInformation}
          />
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            {`ONLINE – REVERSE AUCTION FOR ${
              singleAuctionData?.auctionType === "reverseAuctionService"
                ? singleAuctionData?.serviceName
                : singleAuctionData?.description
            }`}
          </p>
          <h5>
            {reverseCatalogueInformation?.procurementOfHiring?.declaration}
          </h5>
          <p
            style={{
              whiteSpace: "pre-wrap",
              textAlign: "left",
            }}
          >
            {
              reverseCatalogueInformation?.procurementOfHiring
                ?.serviceInformation
            }
          </p>
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            SCHEDULE OF PROGRAMME
          </p>
          <span>
            <CatelogueAuctionDetailTable
              catelogueInformation={reverseCatalogueInformation}
            />
            <p className="mt-1">
              The General Terms & Conditions annexed herewith shall be read
              together and are complementary to each other.
            </p>
          </span>
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            Contact Details
          </p>
          <ContactDetails
            reverseCatalogueInformation={reverseCatalogueInformation}
          />
          <ContactPersonTable catelogueInformation={reverseCatalogueInformation} />
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            Service Lot Table
          </p>
          {singleAuctionData?.auctionType === "reverseAuctionService" ? (
            <ReverseServiceLotTable
              catelogueInformation={reverseCatalogueInformation}
            />
          ) : (
            <>
              <ReverseAuctionProductTable
                editValue={false}
                catelogueInformation={reverseCatalogueInformation}
              />
              <ViewLotsImage catelogueInformation={reverseCatalogueInformation} />
            </>
          )}
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            TERMS & CONDITIONS
          </p>
          <TermsAndCondition reverseCatalogueInformation={reverseCatalogueInformation} fieldName="termsAndCondition" />
          <p
            className="margin-0px font-16px cover cercle-purple text-uperCase white-text"
            style={{ padding: "0.7rem" }}
          >
            GENERAL TERMS & CONDITIONS
          </p>
          <TermsAndCondition reverseCatalogueInformation={reverseCatalogueInformation} fieldName="generalTermsAndCondition" />
        </div>
        <p
          className="select-label cover pointer"
          style={{ right: isMobile ? "20px" : "50px", padding: "5px 10px" }}
          onClick={() => setEditReverseCatelogue(true)}
        >
          <span className="material-icons-outlined font-16px">edit</span>
          <span className="font-16px">Edit</span>
        </p>
      </div>
      <div className="flex justify-center mt-1">
        <ReverseCatalogueDownload reverseCatalogueInformation={reverseCatalogueInformation} />
      </div>
    </>
  );
}

export default ConFirmReverseCatalogue;
