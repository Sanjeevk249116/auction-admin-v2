import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Select } from "react-materialize";
import AccountInfoDashboard from "../../dashboard/comman/components/AccountInfoDashboard";
import ButtonAnimation from "../../utils/ButtonAnimation";
import SellerAuctionStatus from "./components/SellerAuctionStatus";

function SellerDetails({ singleAccountdata }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isDastop = useMediaQuery({ query: "(max-width: 1420px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 650px)" });
  const [searchData, setSearchData] = useState("");
  const [auctionFilter, setAuctionFilter] = useState("");
  const [sellerHomePageButton, setSellerHomePageButton] = useState(1);

  useEffect(() => {
    setSearchData("");
  }, [sellerHomePageButton]);

  return (
    <div>
      <div className={` ${isTablet ? "flex column gap-10px" : "valign-wrapper space-between"}`}>
        <span className={`valign-wrapper gap-1`}>
          <span
            className="material-icons-outlined pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
          <h4>Seller Details</h4>
        </span>
        <div className="valign-wrapper gap-10px">
          <button
            className={`button-style pointer cercle-purple-text font-18px`}
            style={{
              padding: "5px 20px",
              border: "1px solid #6f2da8",
            }}
            onClick={() => {
              navigate(`/select-auction/type/create-auction/${id}`);
            }}
          >
            Schedule Auction
          </button>
          {/* <button
            className={`button-style pointer white-text font-18px`}
            style={{
              padding: "7px 20px",
              backgroundImage: "linear-gradient(#3C0A67, #6F2DA8)",
            }}
            onClick={() => {
              navigate(`/wallet/${singleAccountdata?._id}`);
            }}
          >
            View wallet
          </button> */}
        </div>
      </div>
      <AccountInfoDashboard auctionInformation={singleAccountdata} />

      <div className="mt-2 flex column gap-1">
        <h4>List of Auction</h4>
        <div className="valign-wrapper space-between flex-wrap">
          <ButtonAnimation
            buttonPosition={sellerHomePageButton}
            setButtonPosition={setSellerHomePageButton}
          />
          <div className="valign-wrapper gap-1">
            <span
              className="input-field-style"
              style={{
                height: "40px",
                width: "260px",
                marginBottom: isDastop && "1rem",
              }}
            >
              <img src="/images/urlIcon.png" alt="auctionLogo" width={25} />
              <Select
                className="custom-width-dropdown"
                multiple={false}
                options={{
                  classes: "browser-default",
                  dropdownOptions: {
                    alignment: "left",
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    coverTrigger: false,
                  },
                }}
                onChange={(e) => setAuctionFilter(e.target.value)}
              >
                <option value="">All Auction</option>
                <option value="forwardAuction">Forward Auction</option>
                <option value="reverseAuctionService">Reverse Service Auction</option>
                <option value="reverseAuctionProduct">Reverse Product Auction</option>
              </Select>
            </span>
            <div
              className="input-field-style "
              style={{
                height: "40px",
                width: "250px",
                marginBottom: isDastop && "1rem",
              }}
            >
              <span className="material-symbols-outlined primary ">search</span>
              <input
                className="browser-default input-field  "
                placeholder="Search"
                value={searchData}
                type="text"
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
          </div>
        </div>
        <SellerAuctionStatus
          sellerHomePageButton={sellerHomePageButton}
          searchData={searchData}
          auctionFilter={auctionFilter}
        />
      </div>
    </div>
  );
}

export default SellerDetails;
