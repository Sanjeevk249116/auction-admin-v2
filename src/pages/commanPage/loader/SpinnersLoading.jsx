import { useState, CSSProperties } from "react";
import { HashLoader, PulseLoader } from "react-spinners";

function SpinnersLoading() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#6f2da8"
  };

  return (
    <div
      className="flex justify-center  column align-center  gap-1 p-1 "
      style={{
        height: "80vh"
      }}
    >
      <HashLoader
        color={"#6f2da8"}
        loading={true}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      <span className="flex mt-1 ">
        <p className="grey-text">LOADING</p>
        <PulseLoader
          color={"#6f2da8"}
          loading={true}
          cssOverride={override}
          size={8}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </span>
    </div>
  );
}

export default SpinnersLoading;
