import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function AuctionStatusButton({ buttonPosition, setButtonPosition }) {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [gliderWidth, setGliderWidth] = useState(0);
  useEffect(() => {
    const activeButton = document.querySelector(
      `.timing_schedule .bold:nth-child(${buttonPosition})`
    );
    if (activeButton) {
      const buttonWidth = activeButton.offsetWidth;
      setGliderWidth(buttonWidth);
    }
  }, [buttonPosition]);
  return (
    <span
      className={`timing_schedule flex ${
        isMobile ? "column text-center" : "white"
      } lighten-4`}
      style={{ width: isMobile ? "100%" : "572px" }}
    >
      <p
        className={
          buttonPosition === 1
            ? `pointer bold white-text margin-0px ${
                isMobile && "cercle-purple"
              }`
            : "pointer margin-0px"
        }
        onClick={() => setButtonPosition(1)}
      >
        All
      </p>
      <p
        className={
          buttonPosition === 2
            ? `pointer bold white-text ${isMobile && "cercle-purple"}`
            : "pointer "
        }
        onClick={() => setButtonPosition(2)}
      >
        Today
      </p>
      <p
        className={
          buttonPosition === 3
            ? `pointer bold white-text ${isMobile && "cercle-purple"}`
            : "pointer "
        }
        onClick={() => setButtonPosition(3)}
      >
        Upcoming
      </p>
      <p
        className={
          buttonPosition === 4
            ? `pointer bold white-text ${isMobile && "cercle-purple"}`
            : "pointer "
        }
        onClick={() => setButtonPosition(4)}
        style={{ marginRight: "0px" }}
      >
        PCB
      </p>
      <p
        className={
          buttonPosition === 5
            ? `pointer bold white-text ${isMobile && "cercle-purple"}`
            : "pointer "
        }
        onClick={() => setButtonPosition(5)}
      >
        Completed
      </p>
      {!isMobile && (
        <span
          className="glider"
          style={{
            transform:
              buttonPosition === 5
                ? "translateX(283%)"
                : buttonPosition === 4
                ? "translateX(375%)"
                : buttonPosition === 3
                ? "translateX(135%)"
                : buttonPosition === 2
                ? "translateX(77%)"
                : "translateX(0%)",
            width: `${gliderWidth}px`,
          }}
        ></span>
      )}
    </span>
  );
}

export default AuctionStatusButton;
