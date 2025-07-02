/* eslint-disable array-callback-return */
import React from "react";
import AuctionAnalystics from "./components/AuctionAnalystics";
import Statistics from "./components/Statistics";
import TranscationAnalytics from "./components/TranscationAnalytics";
import SubscriptionAnalysis from "./components/SubscriptionAnalysis";
import AuctionStatus from "../auctionList/AuctionStatus";
import { useMediaQuery } from "react-responsive";

function Dashboard() {
  const isLaptop = useMediaQuery({ query: "(max-width: 1350px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 950px)" });

  return (
    <div className="mt-1">
      {/* <h4>Admin Dashborad</h4> */}
      <div
        className="mt-1 gap-1"
        style={{
          display: "grid",
          gridTemplateColumns: !isLaptop && "1fr 0.5fr",
        }}
      >
        <AuctionAnalystics />
        {isLaptop ? <TranscationAnalytics /> : <Statistics />}
      </div>
      <div
        className="mt-1 gap-1"
        style={{
          display: "grid",
          gridTemplateColumns:isTablet?"": isLaptop ? "1fr 1.5fr" : "1fr 0.5fr",
        }}
      >
        {isLaptop ? <Statistics /> : <TranscationAnalytics />}
        <SubscriptionAnalysis />
      </div>
      <AuctionStatus />
    </div>
  );
}

export default Dashboard;
