import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

function SubscriptionLoader() {
  return (
    <div
      className="border-radius-12 pin-top select-wrapper"
      style={{
        border: "1px solid #6f2da8",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        padding: "16px",
      }}
    >
      <div>
        <div className="p-1" style={{ zIndex: "1" }}>
          <Skeleton
            height={24}
            width={130}
            style={{ borderRadius: "8px", marginBottom: "8px" }}
          />
          <Skeleton
            height={45}
            width={100}
            style={{ marginBottom: "8px" }}
          />
          <Skeleton
            height={20}
            width={80}
            style={{ marginBottom: "16px" }}
          />
        </div>
        <hr />
        <div className="p-2">
          <Skeleton
            height={25}
            width={100}
            style={{
              margin: "0 auto",
              marginBottom: "16px",
            }}
          />
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              height={20}
              style={{ marginBottom: "8px" }}
            />
          ))}
        </div>
      </div>
      <Skeleton
        height={40}
        width={100}
        style={{
          borderRadius: "30px",
          padding: "10px 20px",
          position: "absolute",
          top: "87%",
          left: "23%",
        }}
      />
    </div>
  )
}

export default SubscriptionLoader
