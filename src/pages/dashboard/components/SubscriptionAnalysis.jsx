import React from "react";
import { useMediaQuery } from "react-responsive";
import {
  Area,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
const data = [
  { name: "0", amount: "0", noOfPeople: "0" },
  { name: "Jan", amount: "24500", noOfPeople: "24" },
  { name: "Feb", amount: "24500", noOfPeople: "13" },
  { name: "Mar", amount: "24500", noOfPeople: "48" },
  { name: "Apr", amount: "24500", noOfPeople: "32" },
  { name: "May", amount: "24500", noOfPeople: "42" },
  { name: "Jun", amount: "24500", noOfPeople: "31" },
  { name: "July", amount: "24500", noOfPeople: "12" },
];
function SubscriptionAnalysis() {
    const isDastop = useMediaQuery({ query: "(max-width: 1850px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1350px)" });
  return (
    <div
      className={`white z-depth-1 cover full-width`}
      style={{ width: isLaptop ?"100%":isDastop? "600px":"610px", padding: "7px" }}
    >
      <p
        className="valign-wrapper justify-center font-18px"
        style={{ padding: "5px" }}
      >
        Total Number of Subscription (2025)
      </p>
      {/* <hr color="#E5E5EF" /> */}

      <div className="valign-wrapper justify-center mt-1">
        <ResponsiveContainer width="100%" height={230}>
          <ComposedChart data={data}>
            {/* <CartesianGrid verticalPoints={[-1]} /> */}
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="noOfPeople"
              stroke="#6A0DAD"
              fillOpacity={1}
              fill="url(#colorUvv)"
            />

            <defs>
              <linearGradient id="colorUvv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6A0DAD" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#6A0DAD" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="cover valign-wrapper p-1 grey lighten-5" style={{}}>
        <span>
          <p>{`${label}`}</p>
          <p>
            <span className="red-text">Total Subscription:</span>
            {` ${payload[0].value}`}
          </p>
        </span>
      </div>
    );
  }
};
export default SubscriptionAnalysis;
