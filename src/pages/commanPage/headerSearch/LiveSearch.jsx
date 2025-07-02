import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import searchHeaderData from '../../../jsonData/searchHeader.json'
import { useMediaQuery } from "react-responsive";

function LiveSearch() {
  const isDesktop = useMediaQuery({ query: "(max-width: 1500px)" });
  const ref = useRef();

  const [wordEntered, setWordEntered] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const [userAccountType, setUserAccountType] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (event) => {
    if (event.keyCode === 38) {
      setSelectedIndex((prevIndex) =>
        prevIndex - 1 < 0 ? filterResult?.length - 1 : prevIndex - 1
      );
    } else if (event.keyCode === 40) {
      setSelectedIndex((prevIndex) =>
        prevIndex + 1 >= filterResult?.length ? 0 : prevIndex + 1
      );
    }
  };

  function filterData(searchString) {
    return userAccountType?.filter((item) => {
      const names = item?.wordList;
      const searchTerm = searchString;

      return names.some((word) => word.includes(searchTerm));
    });
  }

  function filterItems(searchString) {
    const filteredItems = userAccountType?.filter((item) => {
      const names = item.wordList?.map((name) => name?.toLowerCase());
      const searchTerm = searchString?.toLowerCase();
      return names?.some((name) => name?.includes(searchTerm));
    });
    return filteredItems;
  }

  useEffect(() => {
    const filteredItems = filterItems(wordEntered);
    setFilterResult(filteredItems);
  }, [wordEntered]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setUserAccountType(searchHeaderData)
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenSearch(false);
      setWordEntered("");
    }
  };

  return (
    <div>
      <div
        className="input-field-style mr-1"
        style={{
          height: "40px",
          width:  isDesktop ? "270px" : "400px",
          marginTop: "0px",
          borderRadius: "30px",
        }}
      >
        <span className="material-icons-outlined">search</span>
        <input
          className="browser-default input-field  "
          placeholder="Search"
          type="text"
          onChange={(e) => {
            filterData(e.target.value);
            setWordEntered(e.target.value);
            setOpenSearch(true);
            setSelectedIndex(-1);
          }}
          value={wordEntered}
          onKeyDown={handleKeyDown}
        // onKeyPress={openPage}
        />
      </div>

      {filterResult.length === 0 && wordEntered !== "" && openSearch && (
        <div className="search-result" ref={ref}>
          <div className="flex align-center justify-center ">
            <p className="mv-1 grey-text" style={{ fontSize: "10px" }}>
              No Results for {wordEntered}.
            </p>
          </div>
        </div>
      )}

      {filterResult.length > 0 && wordEntered !== "" && openSearch && (
        <div className="search-result" ref={ref}>
          {filterResult.length === 0 && wordEntered !== "" && (
            <div className="flex align-center justify-center ">
              <p className="mv-1 grey-text" style={{ fontSize: "10px" }}>
                No Results
              </p>
            </div>
          )}
          {filterResult.map((item, index) => {
            return (
              <Link
                to={item?.link}
                onClick={() => {
                  setOpenSearch(false);
                  setWordEntered("");
                }}
                className="red"
                key={index}
              >
                <div
                  key={index}
                  className={
                    index === selectedIndex
                      ? "selected search-item search-item-active "
                      : "search-item "
                  }
                  tabIndex="0"
                  onMouseEnter={() => setSelectedIndex(-1)}
                >
                  <span
                    className="material-symbols-outlined cercle-purple-text "
                    style={{ fontSize: "22px" }}
                  >
                    {item.icon}
                  </span>
                  <span>
                    <b
                      style={{ fontSize: "14px", margin: "0", color: "#000 " }}
                    >
                      {item.title}
                    </b>
                    <p
                      className="grey-text "
                      style={{ fontSize: "11px", margin: "0" }}
                    >
                      {item.descraption}
                    </p>
                  </span>
                </div>
              </Link>
            );
          })}
          <div className="flex align-center justify-center ">
            <p className="mv-1 grey-text" style={{ fontSize: "10px" }}>
              End of Results - There are no more items to display
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveSearch;
