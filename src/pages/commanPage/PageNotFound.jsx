import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 700px)" });
  return (
    <div className="valign-wrapper justify-center " style={{ height: "88vh" }}>
      <div className="valign-wrapper column">
      <p style={{ fontSize: isTablet ? "120px" : "250px" }}>404</p>
        <h2 className="">Page Not Found</h2>
        <b className="font-20px font-cercular-bold cercle-purple-text">
          Sorry, we can't find the page you're looking for.
        </b>
        <button
          className={`pointer cercle-purple white-text mt-2`}
          style={{
            padding: "12px 40px",
            borderRadius: "50px",
            backgroundImage:
              "linear-gradient(to right,rgba(65, 4, 117, 1), rgba(100, 26, 164, 1))",
          }}
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
