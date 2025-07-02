import React, { useEffect, useState } from "react";
import LiveAuctionList from "./LiveAuctionList";
import { useDispatch, useSelector } from "react-redux";
import { getLiveAuctionList } from "../../redux/action/liveRoom";
import { useNavigate } from "react-router-dom";

function TodayLiveAuction() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { auctionLoading } = useSelector((state) => state.liveAuction);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleReload = () => {
    dispatch(getLiveAuctionList());
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="mt-1" style={{ overflow: "hidden" }}>
      <span className="flex space-between align-center mb-1">
        <span className="valign-wrapper gap-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate('/')}
        >
          arrow_back
        </span>
        <h5 className="mb-1">Live Auctions</h5>
      </span>
        <span className="flex align-center gap-1">
          <button
            className="flex align-center reload-btn"
            onClick={handleReload}
            disabled={auctionLoading}
          >
            <span className="material-symbols-outlined">autorenew</span>
            <p>Reload</p>
          </button>
          <b className="time-update">
            IST Time Zone: {currentTime.toLocaleTimeString()}
          </b>
        </span>
      </span>

      <LiveAuctionList />
    </div>
  );
}

export default TodayLiveAuction;
