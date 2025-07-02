import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function CoordinatorButton({ buttonPosition, setButtonPosition }) {
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
      style={{ width: isMobile ? "100%" : "490px" }}
    >
       <p
        className={
          buttonPosition === 1
            ? `pointer bold white-text ${isMobile && "cercle-purple"}`
            : "pointer bold"
        }
        onClick={() => setButtonPosition(1)}
      >
       All
      </p>
      <p
        className={
          buttonPosition === 2
            ? `pointer bold white-text ${isMobile && "cercle-purple"}`
            : "pointer bold"
        }
        onClick={() => setButtonPosition(2)}
      >
        Today
      </p>
      <p
        className={
          buttonPosition === 3
            ? `pointer bold white-text ${isMobile && "cercle-purple"}`
            : "pointer bold"
        }
        onClick={() => setButtonPosition(3)}
      >
        Upcoming
      </p>
      <p
        className={
          buttonPosition === 4
            ? `pointer bold white-text ${isMobile && "cercle-purple"}`
            : "pointer bold"
        }
        onClick={() => setButtonPosition(4)}
      >
        Completed
      </p>

      {!isMobile && (
        <span
          className="glider"
          style={{
            transform:buttonPosition===4?"translateX(225%)":
              buttonPosition === 3
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

export default CoordinatorButton;
