import React from "react";
import { useMediaQuery } from "react-responsive";
import { convertTo12HourFormat } from "../../../helper/helpers";

function ServiceLiveSingleLotInfo({ liveOfferData, auctionId }) {
  const isDastop = useMediaQuery({ query: "(max-width: 1600px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1200px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 600px)" });


  return (
    <div
      className={`live-room-font ${isLaptop ? "14px" : isDastop ? "font-16px" : "font-18px"
        } ${isTablet && "valign-wrapper column justify-center flex-wrap"}`}
      style={{
        display: !isTablet && "grid",
        gridTemplateColumns: isLaptop
          ? "repeat(2,1fr)"
          : "300px 0.6fr 0.6fr 0.7fr",
        padding: "1rem",
        gap: isLaptop && "0.3rem",
        fontWeight: 600,
      }}
    >
      <span
        className={`${isTablet ? "valign-wrapper" : "flex"
          } column ${isLaptop ? "gap-5px" : "gap-1"}`}
      >
        {isTablet ? <p>
          Auction Id:{" "}
          <span className="cercle-purple-text">
            {auctionId}
          </span>
        </p> : <p>
          Lot Number:{" "}
          <span className="cercle-purple-text">
            {liveOfferData?.offerNumber}
          </span>
        </p>}
        <p>
        Service title:{" "}
          <span className="cercle-purple-text">
            {liveOfferData?.serviceDetails?.title}
          </span>
        </p>
      </span>
      <span className="valign-wrapper gap-1">
        {!isTablet && (
          <p className="black" style={{ width: "0.5px", height: "100%" }}></p>
        )}
        <span className={`flex column ${isLaptop ? "gap-5px" : "gap-1"}`}>
          <p>
            EMD Amount :{" "}
            <span className="cercle-purple-text">
              {liveOfferData?.EMDAmount}
            </span>
          </p>
          <p>
            Starting Price :{" "}
            <span
              className={`${isLaptop ? "cercle-purple-text" : "white-text"} ${isTablet ? "font-16px" : "font-18px"
                }`}
              style={{
                padding: isLaptop ? "" : isDastop ? "5px 25px" : "7px 30px",
                borderRadius: "8px",
                backgroundImage:
                  !isLaptop && "linear-gradient(to right, #4C2171 , #6F2DA8)",
                fontWeight: "bolder",
                letterSpacing: 2,
              }}
            >
              {liveOfferData?.startingPrice}
            </span>
          </p>
        </span>
      </span>
      <span
        className="valign-wrapper gap-1"
        style={{ marginTop: isTablet ? "" : isLaptop && "-10px" }}
      >
        {!isLaptop && (
          <p className="black" style={{ width: "0.5px", height: "100%" }}></p>
        )}
        <span className={`flex column ${isLaptop ? "gap-5px" : "gap-1"}`}>
          <p>
            No. of Quantity :{" "}
            <span className="cercle-purple-text">
              {liveOfferData?.serviceDetails?.quantity}
            
            </span>
          </p>
          <p>
           Unit :{" "}
            <span className="cercle-purple-text">
              {liveOfferData?.serviceDetails?.unit}
            </span>
          </p>
        </span>
      </span>
      <span className="valign-wrapper gap-1">
        {!isTablet && (
          <p className="black" style={{ width: "0.5px", height: "100%" }}></p>
        )}
        <span className={`flex column ${isLaptop ? "gap-5px" : "gap-1"}`}>
          <p>
            Starting time:{" "}
            <span className="cercle-purple-text">
              {" "}
              {convertTo12HourFormat(
                liveOfferData?.offerSchedule?.startTimeAndDate
              )}
            </span>
          </p>
          <p>
            Closing time:{" "}
            <span className="cercle-purple-text">
              {" "}
              {convertTo12HourFormat(
                liveOfferData?.offerSchedule?.endTimeAndDate
              )}
            </span>
          </p>
        </span>
      </span>
    </div>
  );
}

export default ServiceLiveSingleLotInfo;
