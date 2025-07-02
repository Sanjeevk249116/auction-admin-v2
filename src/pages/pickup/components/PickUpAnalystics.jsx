import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "react-responsive";
import { Dropdown } from "react-materialize";

const data = [
  { name: "Jan", raisePickup: 4000, completePickup: 2400, acceptPick: 3200 },
  { name: "Feb", raisePickup: 3000, completePickup: 1398, acceptPick: 2200 },
  { name: "Mar", raisePickup: 9000, completePickup: 9800, acceptPick: 9400 },
  { name: "Apr", raisePickup: 2780, completePickup: 3908, acceptPick: 3300 },
  { name: "May", raisePickup: 1890, completePickup: 4800, acceptPick: 3100 },
  { name: "Jun", raisePickup: 2390, completePickup: 3800, acceptPick: 2900 },
  { name: "Jul", raisePickup: 3490, completePickup: 4300, acceptPick: 3900 },
  { name: "Aug", raisePickup: 2100, completePickup: 2700, acceptPick: 2400 },
  { name: "Sep", raisePickup: 3200, completePickup: 4400, acceptPick: 3700 },
  { name: "Oct", raisePickup: 4100, completePickup: 5000, acceptPick: 4550 },
  { name: "Nov", raisePickup: 3000, completePickup: 3900, acceptPick: 3450 },
  { name: "Dec", raisePickup: 2800, completePickup: 4200, acceptPick: 3500 },
];

function PickUpAnalystics() {
  const [number, setNumber] = useState(3);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div
      className="mt-1 p-1 box white full-width"
      style={{ borderRadius: "12px" }}
    >
      <div
        className={
          isMobile
            ? "flex column gap-1"
            : "flex space-between align-center mb-1"
        }
      >
        <h5>Pickup Analytics</h5>
        <div className="flex align-center gap-1">
          <div className="flex align-center gap-1">
            <span
              style={{
                width: "10px",
                height: "5px",
                borderRadius: "50%",
                background: "#FF9500",
                padding: "5px",
              }}
            ></span>
            <p> Pickup Requests</p>
          </div>
          <div className="flex align-center gap-1">
            <span
              style={{
                width: "10px",
                height: "5px",
                borderRadius: "50%",
                background: "#ddb8fe",
                padding: "5px",
              }}
            ></span>
            <p> Accept Pickup</p>
          </div>
          <div className="flex align-center gap-1">
            <span
              style={{
                width: "10px",
                height: "5px",
                borderRadius: "50%",
                background: "#6F2DA8",
                padding: "5px",
              }}
            ></span>
            <p>Complete Pickup</p>
          </div>
        </div>
        <Dropdown
          id="monthsDropdown"
          trigger={
            <div className="flex align-center">
              <p
                className="cercle-purple-text"
                style={{
                  fontSize: "14px",
                }}
              >
                Last {number} Months
              </p>
              <span className="material-symbols-outlined cercle-purple-text">
                arrow_drop_down
              </span>
            </div>
          }
        >
          <span onClick={() => setNumber(3)}>3 Months</span>
          <span onClick={() => setNumber(6)}>6 Months</span>
          <span onClick={() => setNumber(12)}>1 Year</span>
          <span onClick={() => setNumber(24)}>2 Years</span>
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data}>
          <XAxis dataKey="name" />

          <Tooltip />
          <Bar
            radius={10}
            dataKey="raisePickup"
            fill="url(#colorUv)"
            barSize={32.5}
          />
          <Line
            type="monotone"
            dataKey="acceptPick"
            stroke="#FF9500"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="completePickup"
            stroke="#6F2DA8"
            strokeWidth={2}
            dot={false}
          />
          <defs>
            <linearGradient
              id="colorUv"
              x1="14"
              y1="181"
              x2="14"
              y2="6.57961e-08"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DEB8FF" />
              <stop offset="1" stopColor="#E6EDFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PickUpAnalystics;
