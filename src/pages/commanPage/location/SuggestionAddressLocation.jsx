import React from "react";

function SuggestionAddressLocation({ getSuggestionItemProps, suggestions }) {
  return (
    <div
      className={`${
        suggestions?.length !== 0 &&
        "autocomplete-dropdown-container z-index-2 select-label cover grey lighten-5"
      }`}
      style={{ border: suggestions?.length !== 0 && "1px solid grey" }}
    >
      {suggestions.map((suggestion, i) => {
        const className = suggestion.active
          ? "suggestion-item--active"
          : "suggestion-item";
        const style = suggestion.active
          ? {
              backgroundColor: "white",
              cursor: "pointer",
              padding: "5px",
            }
          : {
              cursor: "pointer",
              padding: " 5px",
              borderRadius: "12px",
            };
        return (
          <div
            key={i}
            {...getSuggestionItemProps(suggestion, {
              className,
              style,
            })}
          >
            <span>{suggestion.description}</span>
          </div>
        );
      })}
    </div>
  );
}

export default SuggestionAddressLocation;
