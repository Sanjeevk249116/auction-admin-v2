import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { auctionTypeStyle, calculateRemainingTime } from "../../../helper/helpers";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleAuctionLiveRoom } from "../../../redux/action/liveRoom";



function LiveLotsStatus({ item, singleAuctionData }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: "(min-width: 1600px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 900px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 700px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(item?.offerSchedule?.endTimeAndDate)
  );

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime(
        item?.offerSchedule?.endTimeAndDate
      );
      setRemainingTime(newRemainingTime);
      if (formatTime(newRemainingTime) === "00:02:00" || formatTime(newRemainingTime) === "00:00:01") {
        dispatch(getSingleAuctionLiveRoom(id));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [item, id, dispatch]);

  return (
    <div
      className="valign-wrapper space-between font-16px select-label full-width"
      style={{ top: -37 }}
    >
      {!isMobile && <span className="valign-wrapper gap-10px">
        {!isTablet && <span
          className={`valign-wrapper justify-center gap-10px ${isLaptop ? "font-14px" : "font-16px"}`}
          style={{
            border: "1px solid #90cb7b",
            padding: isLaptop ? "1px 8px" : "1px 15px",
            borderRadius: "25px",
            color: "#90cb7b",
            backgroundColor: "#e3ffd9",
          }}
        >
          <p
            className="circle"
            style={{
              width: "9px",
              height: "9px",
              backgroundColor: "#90cb7b",
            }}
          ></p>
          <p>Live</p>
        </span>}
        <span className={`${isLaptop ? "font-14px" : isDesktop ? "font-18px" : "font-16px"}`}>
          Auction Id:{" "}
          <span className="cercle-purple-text">
            {singleAuctionData?.auctionId}
          </span>
        </span>
      </span>}
      {!isLaptop && <span className="valign-wrapper gap-10px">
        <span className={`${isDesktop ? "font-18px" : "font-16px"}`}>
          Bids updates
        </span>
        <span className="material-icons-outlined orange-text">whatshot</span>
      </span>}

      <span className="valign-wrapper gap-1" style={{ width: isTablet ? "280px" : "358px" }}>
        <span className={`${isDesktop ? "font-18px" : "font-16px"}`}>
          Ends in{" "}
          <span className="cercle-purple-text">
            {formatTime(remainingTime)}
          </span>
        </span>
        <span
          className="valign-wrapper select-label"
          style={{ right: "-1px", top: "2px" }}
        >
          <div className="right-angle-triangle"></div>
          <span
            className={`cercle-purple white-text ${isLaptop && "font-14px"}`}
            style={{
              padding: isLaptop ? "7px 12px" : "5px 12px",
              backgroundImage: "linear-gradient(to right, #6F2DA8, #2C1242)",
            }}
          >
            {auctionTypeStyle(singleAuctionData?.auctionType)}
          </span>
        </span>
      </span>
    </div>
  );
}

export default LiveLotsStatus;
