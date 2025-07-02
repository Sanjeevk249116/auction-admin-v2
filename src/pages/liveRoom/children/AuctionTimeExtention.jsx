import React, { useState } from "react";
import AuctionSchedule from "../../commanPage/AuctionInfo/AuctionSchedule";
import { TimePicker } from "react-ios-time-picker";
import { addTimeToBase, convertTo12HourFormat } from "../../../helper/helpers";
import LotTimeExtentionTable from "../table/LotTimeExtentionTable";

function AuctionTimeExtention({ singleAuctionData, singleAuctionLoading, offers }) {
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [updateTime, setUpdateTime] = useState("00:00");


  return (
    <div>
      <h4 className="flex justify-center">Extend Auction Time</h4>
      <AuctionSchedule singleAuctionData={singleAuctionData} liveRoom={false} />
      <div className="flex gap-1 mt-1 column">
        <span className={`valign-wrapper pin-top gap-1`}>
          <h5 style={{ width: "400px" }}>Auction time Extended by :</h5>
          <span
            className="input-tag-style margin-0px timerLocation"
            style={{ height: "46px" }}
          >
            <TimePicker
              role="input"
              type="time"
              required
              value={updateTime}
              cellHeight={70}
              onChange={(time) => setUpdateTime(time)}
            />
          </span>
        </span>
      </div>
      <div className="flex gap-1 mt-2 column">
        <span className="valign-wrapper space-between">
          <h5> Extended lot time</h5>{" "}
          <h6 className="red-text">
            Auction Updated End Time :{" "}
            {addTimeToBase(
              convertTo12HourFormat(
                singleAuctionData?.auctionSchedule?.endingTime
              ),
              updateTime
            )}{" "}
          </h6>
        </span>

        <LotTimeExtentionTable
          singleAuctionData={singleAuctionData}
          singleAuctionLoading={singleAuctionLoading}
          selectedOffers={selectedOffers}
          setSelectedOffers={setSelectedOffers}
        />
      </div>
      <div className="valign-wrapper justify-center gap-2 mt-1">
        <span
          className={`button-style pointer font-20px cercle-purple white-text select-wrapper`}
          style={{
            padding: "0.5rem 1rem",

          }}
          onClick={() => console.log("submit")}
        >
          <h6 className="margin-0px">Submit</h6>
        </span>
      </div>
    </div>
  );
}

export default AuctionTimeExtention;
