import React from "react";
import { useMediaQuery } from "react-responsive";
import { Tooltip as ReactTooltip } from "react-tooltip";

function AuctionTimeAndLocationRerender({ label, detail, descriptionValue }) {
  const descriptionWordCount=120;
  const showTooltip = detail?.length > descriptionWordCount;
  const isTablet = useMediaQuery({ query: "(max-width: 1150px)" });

  return (
    <span>
      <p className="mt-1 grey-text text-darken-2">{label}</p>
      <p
        className="font-16px cercle-purple-text NoOfline"
        style={{ WebkitLineClamp: !isTablet && 1 }}
        {...(descriptionValue &&
          showTooltip &&
          !isTablet && {
            "data-tooltip-id": "tooltip-description",
            "data-tooltip-content": detail,
          })}
      >
        {detail}
      </p>

      {descriptionValue && (
        <ReactTooltip
          id="tooltip-description"
          place="top"
          style={{
            maxWidth: "40%",
          }}
        />
      )}
    </span>
  );
}

export default AuctionTimeAndLocationRerender;
