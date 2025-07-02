import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import * as animationData from "../../../../animationStyle/Animation - 1712748235290.json";
import { useMediaQuery } from "react-responsive";

function SuccessfullyPage() {
  const isTablet = useMediaQuery({ query: "(max-width: 500px)" });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="valign-wrapper column justify-center mt-5">
      <Lottie
        options={defaultOptions}
        style={{ width: !isTablet && "500px", height: !isTablet && "500px" }}
      />
      <b className="font-30px mb-1 text-center">
        Congratulations, your subscription has been successfully completed.
      </b>
      <Link to="/">
        <button
          className="button-style white-text cercle-purple pointer font-weight-600"
          style={{ padding: "15px 45px" }}
        >
          Back to home
        </button>
      </Link>
    </div>
  );
}

export default SuccessfullyPage;
