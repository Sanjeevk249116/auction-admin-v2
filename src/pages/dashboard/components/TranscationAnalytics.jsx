import React, { useState } from "react";
import {
  ComposedChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

import { Dropdown } from "react-materialize";

const data = [
  { name: "", credit: 0, debit: 0 },
  { name: "January", credit: 160, debit: 280 },
  { name: "February", credit: 300, debit: 170 },
  { name: "March", credit: 250, debit: 240 },
  { name: "April", credit: 280, debit: 290 },
  { name: "May", credit: 190, debit: 225 },
  { name: "June", credit: 290, debit: 340 },
  { name: "July", credit: 320, debit: 200 },
  { name: "August", credit: 230, debit: 230 },
  { name: "Sept", credit: 370, debit: 330 },
  { name: "Oct", credit: 170, debit: 170 },
  { name: "Nov", credit: 270, debit: 125 },
  { name: "Dec", credit: 310, debit: 130 },
];

function TranscationAnalytics() {
  const [number, setNumber] = useState(3);
  return (
    <div
      className="white full-width"
      style={{
        borderRadius: "12px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        padding: "10px 10px 0 10px",
      }}
    >
      <div
        className={`
           flex space-between mb-1`}
      >
        <h5 className="margin-0px">Transaction</h5>

        <Dropdown
          id="monthsDropdown"
          trigger={
            <div
              className="valign-wrapper align-center cover grey lighten-3 font-cercular-bold black-text"
              style={{ padding: "5px 25px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                Last {number} Months
              </p>
              <span className="material-icons-outlined">expand_more</span>
            </div>
          }
        >
          <span onClick={() => setNumber(3)}>3 months</span>
          <span onClick={() => setNumber(6)}>6 Months</span>
          <span onClick={() => setNumber(12)}>1 Year</span>
          <span onClick={() => setNumber(24)}>2 Years</span>
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart data={data}>
          {/* <CartesianGrid verticalPoints={[-1]} /> */}
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="credit"
            stroke="#f9bfbe"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="debit"
            stroke="#00C49F"
            fillOpacity={1}
            fill="url(#colorPv)"
          />

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f9bfbe" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C49F" stopOpacity={1} />
              <stop offset="95%" stopColor="#ece7f9" stopOpacity={0.5} />
            </linearGradient>
          </defs>
        </ComposedChart>
      </ResponsiveContainer>
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
            {" "}
            <span className="green-text">Credit:</span>
            {` ${payload[0].value}`}
          </p>
          <p>
            {" "}
            <span className="red-text">Debit:</span>
            {` ${payload[1].value}`}
          </p>
        </span>
      </div>
    );
  }
};

export default TranscationAnalytics;
