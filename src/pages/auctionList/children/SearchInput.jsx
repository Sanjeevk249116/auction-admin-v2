import React from "react";
import { useMediaQuery } from "react-responsive";

function SearchInput({ searchData, setSearchData, searchWidth = "250px" }) {
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  return (
    <div
      className="input-field-style"
      style={{
        height: "40px",
        width: isMobile ? "95%" : searchWidth,
        marginTop: isMobile && "0px",
      }}
    >
      <span className="material-symbols-outlined primary">search</span>
      <input
        className="browser-default input-field"
        placeholder="Search"
        value={searchData}
        type="text"
        onChange={(e) => setSearchData(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
