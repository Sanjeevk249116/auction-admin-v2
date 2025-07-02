import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SpinnersLoading from "../commanPage/loader/SpinnersLoading";
import {
  auctionTypeStyle,
  convertTo12HourFormat,
  handleDateSetUp,
} from "../../helper/helpers";
import { useDispatch, useSelector } from "react-redux";
import { getLiveAuctionList } from "../../redux/action/liveRoom";

function LiveAuctionList() {
  const dispatch = useDispatch();
  const { liveAuctionListData, auctionLoading } = useSelector(
    (state) => state.liveAuction
  );
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  useEffect(() => {
    dispatch(getLiveAuctionList());
  }, [dispatch]);

  return (
    <div>
      {auctionLoading ? (
        <SpinnersLoading />
      ) : (
        <div className="gap-1 flex column">
          {Array.isArray(liveAuctionListData) &&
            liveAuctionListData?.map((item, rowIndex) => (
              <div
                className="live-room-home cover"
                key={rowIndex}
                style={{
                  backgroundColor:
                    item?.auction?.auctionType !== "forwardAuction"
                      ? "rgb(255, 250, 254)"
                      : "white",
                }}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <span className="flex align-center space-between p-1 ">
                    <span className="valign-wrapper align-end ">
                      <img
                        src="../images/urlIcon.png"
                        alt="auction-icon"
                        style={{ width: "30px", height: "30px" }}
                      />
                      &nbsp;
                      <span className="flex align-end green-text gap-10px">
                        <span className="  material-symbols-outlined">
                          task_alt
                        </span>

                        <p className="font-18px"> Live</p>
                      </span>
                    </span>

                    <span className="valign-wrapper gap-1">
                      <button
                        className="join-btn"
                        onClick={() => {
                          if (
                            item?.auction?.auctionType ===
                            "reverseAuctionProduct"
                          ) {
                            navigate(
                              `/reverse-product-auction/live-room/${item?.auction?._id}/${item?.auction?.catalogue?._id}`
                            );
                          } else if (
                            item?.auction?.auctionType ===
                            "reverseAuctionService"
                          ) {
                            navigate(
                              `/reverse-service-auction/live-room/${item?.auction?._id}/${item?.auction?.catalogue?._id}`
                            );
                          } else {
                            navigate(
                              `/forward-auction/live-room/${item?.auction?._id}/${item?.auction?.catalogue?._id}`
                            );
                          }
                        }}
                      >
                        <p>Join live Auction</p>
                        <span className="material-symbols-outlined small-text font-16px">
                          east
                        </span>
                      </button>
                      {/* <button
                      className="red white-text"
                      style={{
                        padding: "9.8px 20px",
                        borderRadius: "7px",
                      }}
                    >
                      <p>End Auction</p>
                    </button> */}
                    </span>
                  </span>

                  <hr className="grey" />

                  <span
                    className={`valign-wrapper ${isMobile ? "column" : "space-between"
                      } p-1`}
                  >
                    <span className="flex column center gap-10px">
                      <label className="font-14px">Auction ID</label>
                      <h6 className="font-15px" style={{ marginTop: "2px" }}>
                        {item?.auction?.auctionId || "N/A"}
                      </h6>
                    </span>

                    <span className="flex column center  gap-10px ">
                      <label className="font-14px">Auction Type</label>
                      <h6 className="font-15px" style={{ marginTop: "2px" }}>
                        {auctionTypeStyle(item?.auction?.auctionType) || "N/A"}
                      </h6>
                    </span>

                    <span className="flex column center  gap-10px ">
                      <label className="font-14px">No. Lots</label>
                      <h6 className="font-15px" style={{ marginTop: "2px" }}>
                        {item?.offers?.length || "N/A"}
                      </h6>
                    </span>

                    <span className="flex column center gap-10px ">
                      <label className="font-14px">Bid Validity</label>
                      <h6 className="font-15px" style={{ marginTop: "2px" }}>
                        {item?.auction?.bidValidity || "N/A"}
                      </h6>
                    </span>

                    <span className="flex column center gap-10px">
                      <label className="font-14px">Contract Validity</label>
                      <h6 className="font-15px" style={{ marginTop: "2px" }}>
                        {item?.auction?.contractValidity || "N/A"}
                      </h6>
                    </span>

                    {item?.auction?.inspectionSchedule?.endDate && <span className="flex column center gap-10px">
                      <label className="font-14px">Inspection Last Date</label>
                      <h6 className="font-15px" style={{ marginTop: "2px" }}>
                        {handleDateSetUp(
                          item?.auction?.inspectionSchedule?.endDate
                        ) || "N/A"}
                      </h6>
                    </span>}
                  </span>
                  <hr className="grey" />

                  <div className="valign-wrapper space-between mr-1">
                    <span className="flex column p-1 gap-1">
                      <span>
                        Auction Time: &nbsp;{" "}
                        <span className="cercle-purple-text">
                          {convertTo12HourFormat(
                            item?.auction?.auctionSchedule?.startingTime
                          )}{" "}
                          -&nbsp;{" "}
                          {convertTo12HourFormat(
                            item?.auction?.auctionSchedule?.endingTime
                          )}
                        </span>
                      </span>
                      <span>
                        Description: &nbsp; {item?.auction?.description}
                      </span>
                    </span>
                    <div className="valign-wrapper gap-1">
                      <span
                        className={`white valign-wrapper gap-1 pointer bold font-18px 
                                             justify-center ${isMobile && "mt-1"
                          }`}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "7px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={() =>
                          navigate(
                            `/single-organization-detail/${item?.auction?.industry}`
                          )
                        }
                      >
                        <h6 className="margin-0px">View Seller Details</h6>
                      </span>
                      <span
                        className={`white valign-wrapper gap-1 pointer bold font-18px 
                                             justify-center ${isMobile && "mt-1"
                          }`}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "7px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={() =>
                          navigate(
                            `/catalogue-view/${item?.auction?.catalogue?._id}`
                          )
                        }
                      >
                        <h6 className="margin-0px">View Catalogue</h6>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {liveAuctionListData?.length === 0 && (
            <div
              className="valign-wrapper justify-center column"
              style={{ width: "100vw", height: "25vh" }}
            >
              {" "}
              <span
                className="material-symbols-outlined "
                style={{ fontSize: 120 }}
              >
                receipt_long
              </span>
              <p className="grey-text">No Live Auctions at the Moment!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LiveAuctionList;
