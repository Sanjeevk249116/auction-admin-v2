import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { getAdminAnalytics } from "../../../redux/action/profile";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function AuctionAnalystics() {
  const dispatch = useDispatch()
  const { analyticData, analyticLoading } = useSelector(state => state.adminAnalytic)
  const [analysticsValue, setAnalysticsValue] = useState([])

  useEffect(() => {
    dispatch(getAdminAnalytics())
  }, [dispatch])

  useEffect(() => {
    const analytic = [
      { sNo: 1, logo: "group", process: "Total Auction", value: analyticData?.todayAuctions + analyticData?.upcomingAuctions + analyticData?.completedAuctions },
      { sNo: 2, logo: "redo", process: "Today Auctions", value: analyticData?.todayAuctions },
      {
        sNo: 3,
        logo: "check_circle_outline",
        process: "Upcoming Auctions",
        value: analyticData?.upcomingAuctions,
      },
      { sNo: 4, logo: "wallet", process: "Completed Auctions", value: analyticData?.completedAuctions },
    ];
    setAnalysticsValue(analytic)
  }, [analyticData])

  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  return (
    <div
      className="p-1 cover white gap-1"
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(1,1fr)" : "repeat(2,1fr)",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      {analysticsValue?.map((items) => (
        <div
          className="border-1px p-1 pointer border-radius-12"
          key={items.sNo}
        >
          <div className="valign-wrapper space-between">
            <h2 className="cercle-purple-text">{analyticLoading ? <Skeleton width={100} /> : items?.value}</h2>
            <span
              className="material-icons-outlined cercle-purple white-text border-radius-12"
              style={{ padding: "0.7rem" }}
            >
              {items.logo}
            </span>
          </div>
          <p className="cercle-purple-text font-18px">{items.process}</p>
          <p className="valign-wrapper font-13px" style={{ color: "#7C8DB5" }}>
            <span className="material-icons-outlined font-18px green-text">
              north_east
            </span>
            <span className=" mr-1" style={{ marginLeft: "5px" }}>
              00.0% {items.process} have increased this week
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default AuctionAnalystics;
