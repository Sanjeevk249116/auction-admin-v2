import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import AuctionTimeAndLocationRerender from "../children/AuctionTimeAndLocationRerender";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  auctionTypeStyle,
  convertTo12HourFormat,
  handleDateSetUp,
  notifyError,
} from "../../../../../helper/helpers";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-materialize";

function ProductAuctionDateAndTime({
  singleAuctionData,
  singleAuctionLoading,
}) {
  const navigate = useNavigate();
  const isDastop = useMediaQuery({ query: "(max-width: 1500px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1340px)" });
  const isLaptopSmall = useMediaQuery({ query: "(max-width: 1140px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 730px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 530px)" });
  const contentRef = useRef();

  return (
    <div ref={contentRef} style={{ width: isLaptopSmall ? "100%" : "65%" }}>
      <div className={`cover p-2 white`} style={{ height: "100%" }}>
        <div className={`${isMobile ? "flex column" : "valign-wrapper"}`}>
          <h5
            className="margin-0px "
            style={{ flex: "0.96", order: isMobile && "2" }}
          >
            Auction ID:{" "}
            <span className="cercle-purple-text">
              {singleAuctionLoading ? (
                <Skeleton width={150} />
              ) : (
                singleAuctionData?.auctionId
              )}
            </span>
          </h5>
          {singleAuctionData?.status !== "completed" && (
            <div className="valign-wrapper gap-1">
              <button
                className={`button-style pointer white-text cercle-purple ${
                  isMobile && "mb-1"
                }`}
                style={{
                  padding: isMobile ? "8px 7px" : "10px 20px",
                  order: isMobile && "2",
                }}
                onClick={() => {
                  if (
                    singleAuctionData?.catalogue?.industryApproval?.status !==
                    "approval"
                  ) {
                    notifyError("Please approve the catalogue first.");
                  } else {
                    navigate(`/reverseAuction/product/price-approval/${singleAuctionData?._id}`);
                  }
                }}
              >
                Add Starting price
              </button>
              {singleAuctionData?.status !== "ongoing" && (
                <Dropdown
                  id={`dropdown-${singleAuctionData?._id}`}
                  options={{ constrainWidth: false, alignment: "right" }}
                  trigger={
                    <span className="material-icons-outlined pointer">
                      more_vert
                    </span>
                  }
                >
                  <div
                    className="valign-wrapper column white justify-center"
                    style={{ width: "150px", height: "40px" }}
                  >
                    {/* <button
                    className="pointer font-16px full-width onHover"
                    style={{ padding: "10px 0" }}
                  >
                    Approve
                  </button>
                  <p
                    className="full-width grey lighten-2"
                    style={{ height: "1px" }}
                  ></p> */}
                    <button
                      className="pointer font-16px full-width onHover"
                      style={{ padding: "10px 0" }}
                      onClick={() =>
                        navigate(
                          `/reverse-auction/product/edit-single-auction/${singleAuctionData?._id}`
                        )
                      }
                    >
                      Edit Auction
                    </button>
                  </div>
                </Dropdown>
              )}
            </div>
          )}
        </div>

        <AuctionTimeAndLocationRerender
          label={"Auction Date & Time"}
          detail={
            singleAuctionLoading ? (
              <Skeleton width={200} />
            ) : (
              `${handleDateSetUp(
                singleAuctionData?.auctionSchedule?.startDate
              )} & ${convertTo12HourFormat(
                singleAuctionData?.auctionSchedule?.startingTime
              )} - ${convertTo12HourFormat(
                singleAuctionData?.auctionSchedule?.endingTime
              )}`
            )
          }
        />

        <AuctionTimeAndLocationRerender
          label={"Auction Type"}
          detail={
            singleAuctionLoading ? (
              <Skeleton width={150} />
            ) : (
              `${auctionTypeStyle(singleAuctionData?.auctionType)} `
            )
          }
        />

        <AuctionTimeAndLocationRerender
          label={"EMD End Date & Time"}
          detail={
            singleAuctionLoading ? (
              <Skeleton width={200} />
            ) : (
              `${handleDateSetUp(
                singleAuctionData?.EMDSchedule?.lastDate
              )} & ${convertTo12HourFormat(
                singleAuctionData?.EMDSchedule?.lastTime
              )}`
            )
          }
        />

        <AuctionTimeAndLocationRerender
          label={"Location"}
          detail={
            singleAuctionLoading ? (
              <Skeleton width={200} />
            ) : (
              singleAuctionData?.location?.address ||
              singleAuctionData?.inspectionSchedule?.inspectionLocation
            )
          }
        />
        <AuctionTimeAndLocationRerender
          label={"Description"}
          descriptionValue={true}
          detail={
            singleAuctionLoading ? (
              <Skeleton width={300} />
            ) : (
              singleAuctionData?.description
            )
          }
        />
        {!singleAuctionLoading && (
          <span className="valign-wrapper gap-1 mt-1">
            <h6 className="font-18px">Price Approval :</h6>
            <p
              className={`font-18px ${
                singleAuctionData?.startingPriceApproval?.status === "approval"
                  ? "green-text"
                  : singleAuctionData?.startingPriceApproval?.status ===
                    "rejected"
                  ? "red-text"
                  : "orange-text"
              }`}
            >
              {singleAuctionData?.startingPriceApproval?.status === "approval"
                ? "Approved"
                : singleAuctionData?.startingPriceApproval?.status ===
                  "rejected"
                ? "Rejected"
                : singleAuctionData?.startingPriceApproval?.status === "draft"
                ? "Draft"
                : "Pending"}
            </p>
          </span>
        )}

        {!isMobile &&
          (singleAuctionLoading ? (
            <Skeleton
              height={300}
              width={isTablet ? 250 : 360}
              style={{
                position: "absolute",
                top: "215px",
                left: isLaptopSmall ? "45%" : isLaptop ? "30%" : "35%",
              }}
            />
          ) : (
            <img
              className="materialboxed"
              src="/images/orderAction.png"
              alt="orderImg"
              style={{
                position: "absolute",
                top: "195px",
                left: isLaptopSmall ? "45%" : isLaptop ? "30%" : "35%",
                width: isTablet ? "250px" : isDastop ? "320px" : "360px",
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductAuctionDateAndTime;
