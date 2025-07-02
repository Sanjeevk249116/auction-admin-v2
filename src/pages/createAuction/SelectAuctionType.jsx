import React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import CreateForwordAuction from "./auctionTypeComponent/CreateForwordAuction";
import CreateServiceReverseAuction from "./auctionTypeComponent/CreateServiceReverseAuction";
import CreateProductReverseAuction from "./auctionTypeComponent/CreateProductReverseAuction";

function SelectAuctionType() {
  const navigate = useNavigate();
  const isDestop = useMediaQuery({ query: "(max-width: 1550px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 600px)" });
  const [auctionType, setAuctionType] = useState("forwardAuction");
  
  return (
    <div className="mt-1">
      <span className="valign-wrapper gap-1 mb-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Create Auction</h4>
      </span>
      <div className={`flex column mb-1 ${!isDestop && "container"}`}
        style={{
          padding: isTablet ? "1rem 1rem 1rem 0rem" : "1rem 3.7rem 1rem 0rem",
          width: isTablet ? "100%" : "90%",
          margin: isDestop && "auto",
        }}>
        <p className="font-16px black-text">Select Auction Type</p>
        <span style={{
          display: "grid",
          gridTemplateColumns: !isTablet && "1fr 1fr 1fr",
          gap: "30px",
        }}>
          <select
            className="browser-default white"
            style={{ ...styles.select }}
            value={auctionType}
            onChange={(e) => {
              setAuctionType(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Choose your Auction type
            </option>
            <option value="forwardAuction" style={{ padding: "10px" }}>
              Forward auction
            </option>
            <option value="reverseAuctionService">Reverse auction for service</option>
            <option value="reverseAuctionProduct">Reverse auction for product</option>
          </select>
        </span>
      </div>
      {auctionType === "reverseAuctionService" ? (
        <CreateServiceReverseAuction auctionType={auctionType} />
      ) : auctionType === "reverseAuctionProduct" ? (
        <CreateProductReverseAuction auctionType={auctionType} />
      ) : (
        <CreateForwordAuction auctionType={auctionType} />
      )}
    </div>
  );
}

const styles = {
  select: {
    padding: "12.5px",
    backgroundColor: "#fafafa",
  },
};

export default SelectAuctionType;
