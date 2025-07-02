import React from "react";
import { useMediaQuery } from "react-responsive";
import { capitalizeEveryFirstLetter } from "../../../../../helper/helpers";

function AdminPaySusbcription({
  items,
  handleSelectSubscription,
  selectPaySusbcription,
}) {
  const isDastop = useMediaQuery({ query: "(max-width: 1550px)" });

  return (
    <div
      className={"border-radius-12 pin-top select-wrapper "}
      style={{
        border: "1px solid #6f2da8",
        height: "580px",
      }}
    >
      <div>
        <div style={{ zIndex: "1", padding: isDastop ? "6px" : "10px" }}>
          <p
            className=" font-16px lenar-gradiant white-text mb-1"
            style={{
              padding: "5px 8px",
              borderRadius: "8px",
            }}
          >
            {capitalizeEveryFirstLetter(items?.name)}
          </p>
          <span className="cercle-purple-text bold font-25px">
            ₹ {items?.price} /
            <span className="font-20px">
              {items?.numberOfYears}{" "}
              {items?.numberOfYears === 1 ? "year" : "years"}
            </span>
          </span>
        </div>
        <hr />
        <div style={{ padding: isDastop ? "1rem 6px" : "1rem 10px" }}>
          <h2
            className="flex justify-center  font-25px cercle-purple-text "
            style={{ marginTop: "0px" }}
          >
            Features
          </h2>
          {items?.features?.slice(0, 10)?.map((items, index) => (
            <p
              key={items}
              className={`${isDastop ? "font-13px" : "font-15px"} valign-wrapper fontstyle NoOfline`}
              style={{ WebkitLineClamp: 1, lineHeight: "25px" }}
            >
              <span className="material-icons-outlined cercle-purple-text font-14px">
                check
              </span>
              <span> {items}</span>
            </p>
          ))}
          {items?.features?.length > 10 && (
            <p
              className=" font-14px valign-wrapper fontstyle NoOfline"
              style={{ WebkitLineClamp: 1, lineHeight: "25px" }}
            >
              <span className="material-icons-outlined cercle-purple-text font-16px">
                check
              </span>
              <span> ..... more</span>
            </p>
          )}
        </div>
      </div>
      <span
        className="material-symbols-outlined cercle-purple-text select-label pointer"
        style={{
          top: "89%",
          left: "43%",
          fontSize: "38px",
        }}
        onClick={() => handleSelectSubscription(items)}
      >
        {selectPaySusbcription?._id === items?._id
          ? " check_box"
          : "check_box_outline_blank"}
      </span>
    </div>
  );
}

export default AdminPaySusbcription;
