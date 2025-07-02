import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import AuctionOfferandTime from "./components/AuctionOfferandTime";
import OfferListTable from "../../../commanPage/table/OfferListTable";
import CatelogueTable from "./tables/CatelogueTable";
import TimeSlotOfOffer from "./components/TimeSlotOfOffer";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAuction } from "../../../../redux/action/auction";
import { Dropdown } from "react-materialize";
import { notifyError } from "../../../../helper/helpers";
import { uploadCateloguePdf } from "../../../../redux/action/catelogue";
import { startingPriceApproval } from "../../../../redux/action/price";
import BiddingPermission from "./tables/BiddingPermission";
import SearchInput from "../../../auctionList/children/SearchInput";
import { globalContext } from "../../../../context/ContextProvider";

function SingleAuctionDetails() {
  let navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const isLaptop = useMediaQuery({ query: "(max-width: 1140px)" });
  const { setCheckCatalogueSameData } = useContext(globalContext);
  const [searchData, setSearchData] = useState("");
  const { singleAuctionData, singleAuctionLoading } = useSelector(
    (state) => state.singleAuction
  );
  const { approvelLoading } = useSelector(
    (state) => state.startingPriceApproval
  );
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    event.target.value = null;

    if (file) {
      const validTypes = ["application/pdf"];
      const maxSizeInBytes = 1 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        notifyError("Unsupported file format. Only PDF files are allowed.");
      } else if (file.size > maxSizeInBytes) {
        notifyError(
          "The Uploaded PDF exceeds the 1MB limit. Please compress the PDF before uploading or reduce the number of images/content."
        );
      } else {
        const formFile = new FormData();
        formFile.append("file", file, `${singleAuctionData?.auctionId}.pdf`);
        dispatch(
          uploadCateloguePdf(id, formFile, navigate=false, setCheckCatalogueSameData)
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getSingleAuction(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className="valign-wrapper space-between mt-1">
        <span className="valign-wrapper gap-1">
          <span
            className="material-icons-outlined pointer"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
          <h4>Auction Details</h4>
        </span>
        <span className="valign-wrapper justify-center gap-1">
          <button
            className={`button-style pointer cercle-purple white-text font-weight-600 font-18px font-cercular-bold`}
            style={{
              padding: "5px 28px",
            }}
            onClick={() => navigate(`/forward-auction/trader/pay-emd/${id}`)}
          >
            Pay-emd
          </button>
          <button
            className={`button-style pointer cercle-purple-text font-weight-600 font-18px font-cercular-bold`}
            style={{
              padding: "5px 38px",
              border: "1px solid #6f2da8",
            }}
            onClick={() => {
              const status = singleAuctionData?.startingPriceApproval?.status;

              if (["approval", "rejected", "draft"].includes(status)) {
                notifyError(
                  "This price has already been processed. You cannot create another offer."
                );
              } else {
                navigate(`/create-auction-lots/forward/${id}`);
              }
            }}
          >
            Create lots
          </button>
        </span>
      </div>

      <div className={`flex gap-1 mt-1 ${isLaptop && "column"}`}>
        <AuctionOfferandTime
          singleAuctionData={singleAuctionData}
          singleAuctionLoading={singleAuctionLoading}
        />
        <TimeSlotOfOffer
          singleAuctionData={singleAuctionData}
          singleAuctionLoading={singleAuctionLoading}
        />
      </div>

      <div className={`white cover p-2 mt-2`}>
        <div className="flex space-between">
          <h4 className=" cercle-black-text mb-1">
            Auction Catalogue & Corrigendum
          </h4>
          {(singleAuctionData?.status !== "completed" ||
            singleAuctionData?.status === "ongoing") && (
            <Dropdown
              id={`catelogue`}
              options={{
                constrainWidth: false,
              }}
              trigger={
                <button
                  className={`button-style pointer font-16px select-wrapper white-text`}
                  style={{
                    padding: "8px 15px",
                    backgroundImage: "linear-gradient(#6F2DA8, #4A1975)",
                  }}
                >
                  <span className="valign-wrapper gap-10px">
                    <span>Add Catalogue</span>
                    <span className="material-icons-outlined pointer font-20px">
                      control_point
                    </span>
                  </span>
                </button>
              }
            >
              <div
                className="valign-wrapper column white justify-center"
                style={{ width: "170px" }}
              >
                <button
                  className="pointer font-16px full-width onHover"
                  style={{ padding: "10px 0px" }}
                  onClick={() => navigate(`/catalogue-detail/${id}`)}
                >
                  Create catalogue
                </button>
                <p className="full-width grey" style={{ height: "1px" }}></p>
                <button
                  className="pointer font-16px full-width onHover"
                  style={{ padding: "10px 0px" }}
                  onClick={handleUploadClick}
                >
                  Upload catalogue
                </button>
                <input
                  type="file"
                  id="file-input"
                  name="chequeFile"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </div>
            </Dropdown>
          )}
        </div>
        <CatelogueTable singleAuctionData={singleAuctionData} />
      </div>

      <div className="mt-2">
        <div className="valign-wrapper space-between">
          <h4>Lots Details</h4>

          {!singleAuctionLoading &&
            singleAuctionData?.startingPriceApproval?.status !== "approval" &&
            singleAuctionData?.offers?.[0]?.startingPrice > 0 && (
              <button
                className={`button-style pointer white-text cercle-purple`}
                style={{
                  padding: "10px 20px",
                  width: "150px",
                }}
                onClick={() =>
                  dispatch(startingPriceApproval(singleAuctionData?._id))
                }
              >
                {approvelLoading ? "Loading..." : "Price Approval"}
              </button>
            )}
        </div>
          <OfferListTable
            offers={singleAuctionData?.offers}
            status={singleAuctionData?.status}
            auctionType={singleAuctionData?.auctionType}
            loading={singleAuctionLoading}
          />
      </div>
      <div className="mt-2">
        <div className="valign-wrapper space-between">
          <span style={{ marginBottom: "-35px" }}>
            <h4>Bids Permission</h4>
          </span>
          <div className="valign-wrapper gap-1">
            <SearchInput
              searchData={searchData}
              setSearchData={setSearchData}
            />
            <button
              className={`button-style pointer white-text cercle-purple`}
              style={{
                padding: "10px 20px",
                marginTop: "16px",
              }}
              onClick={() => navigate(`/forward-auction/single-auction/add-new-trader/${id}`)}
            >
              Add new trader
            </button>
          </div>
        </div>
        <BiddingPermission searchData={searchData} />
      </div>
    </div>
  );
}

export default SingleAuctionDetails;
