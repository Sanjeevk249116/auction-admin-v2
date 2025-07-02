import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";


const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const Statistics = () => {
  const { analyticData } = useSelector(state => state.adminAnalytic)
  const isDastop = useMediaQuery({ query: "(max-width: 1850px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1350px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 950px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 650px)" });
  const [data, setData] = useState([])

  useEffect(() => {
    const value = [
      { name: "Buyer", value: analyticData?.numberOfTraders },
      { name: "Seller", value: analyticData?.numberOfIndustry },
      // { name: "Total Auction", value: analyticData?.todayAuctions + analyticData?.upcomingAuctions + analyticData?.completedAuctions },
    ]
    setData(value)
  }, [analyticData])

  return (
    <div
      className="white z-depth-1 cover full-width"
      style={{ width: isTablet ? "100%" : isLaptop ? "500px" :isDastop? "600px":"610px" }}
    >
      <p className="valign-wrapper justify-center p-1 font-18px">
        Auction Dashboard Overview
      </p>
      <hr color="#E5E5EF" />
      <div
        className={`valign-wrapper ${isMobile ? "column p-1" : "justify-center"}`}
      >
        <div className="valign-wrapper justify-center full-width">
          <ResponsiveContainer width={300} height={250}>
            <PieChart>
              <Tooltip cursor={{ stroke: "red", strokeWidth: 2 }} />
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{ outline: "none" }}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex column gap-1" style={{ width: !isMobile && "300px" }}>
          <h6 className="font-16px">Number of Seller: {analyticData?.numberOfIndustry}</h6>
          <h5 className="font-16px">Number of Buyer: {analyticData?.numberOfTraders}</h5>
          <h6 className="font-16px">Total Subscription: 0</h6>
          <h6 className="font-16px">Total Auction: {analyticData?.todayAuctions + analyticData?.upcomingAuctions + analyticData?.completedAuctions}</h6>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
