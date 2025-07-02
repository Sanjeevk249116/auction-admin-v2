import React from "react";
import { capitalizeFirstLetter } from "../../../helper/helpers";
import { useMediaQuery } from "react-responsive";

function SingleCoordinatorHeader({ singleCoordinatorDetails }) {
  const isTablet = useMediaQuery({ query: "(max-width: 950px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });

  return (
    <div
      className={`cover  white ${!isTablet && "valign-wrapper space-between"}`}
      style={{
        padding: "1rem 2rem",
        display: isTablet && "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: isTablet && "2rem"
      }}
    >
      <span className="valign-wrapper gap-1">
        <img
          className={`circle`}
          width="50px"
          height="50px"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
        />
        <span className=" flex column gap-10px">
          <h5>{singleCoordinatorDetails?.name}</h5>
          <p>{singleCoordinatorDetails?.email}</p>
        </span>
      </span>
      <span className="valign-wrapper column font-16px gap-1">
        <span className="valign-wrapper gap-10px">
          <span className="material-symbols-outlined font-20px">call</span>
          <h6>{singleCoordinatorDetails?.phoneNumber}</h6>
        </span>

        <h6 className="green-text">{capitalizeFirstLetter(singleCoordinatorDetails?.status)}</h6>

      </span>
      <span className="flex column font-16px gap-1">
        <span className="valign-wrapper gap-1">
          <span className="material-symbols-outlined font-20px">task_alt</span>
          <h6>
            Role: {capitalizeFirstLetter(singleCoordinatorDetails?.position)}
          </h6>
        </span>
        <span className="valign-wrapper gap-1">
          <span className="material-symbols-outlined font-20px">
            location_on
          </span>
          <h6>{singleCoordinatorDetails?.address?.city},{singleCoordinatorDetails?.address?.state} </h6>
        </span>
      </span>
      <span className="valign-wrapper column gap-1">
        <h5>Created Auction</h5>
        <h6
          className="white-text border-12px"
          style={{
            padding: isMobile ? "5px 15px" : "8px 50px",
            backgroundImage: "linear-gradient(#4C2171, #6F2DA8)",
          }}
        >
          {singleCoordinatorDetails?.auctions?.length}
        </h6>
      </span>
    </div>
  );
}

export default SingleCoordinatorHeader;
