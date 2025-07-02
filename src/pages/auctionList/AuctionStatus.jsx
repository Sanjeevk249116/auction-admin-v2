import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import AuctionFilterSelector from "./children/AuctionFilterSelector";
import SearchInput from "./children/SearchInput";
import AuctionStatusButton from "../utils/AuctionStatusButton";
import AuctionList from "./components/AuctionList";
import { globalContext } from "../../context/ContextProvider";

function AuctionStatus() {
  const isDastop = useMediaQuery({ query: "(max-width: 1420px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const [searchData, setSearchData] = useState("");
  const [auctionFilter, setAuctionFilter] = useState("");
  const { homePageButton, setHomePageButton } = useContext(globalContext)


  useEffect(() => {
    setSearchData("");
  }, [homePageButton]);

  return (
    <div className="mt-2">
      <h4>List of Auction</h4>
      <div className="mt-1 flex column gap-1">
        <div className="valign-wrapper space-between flex-wrap">
          <AuctionStatusButton
            buttonPosition={homePageButton}
            setButtonPosition={setHomePageButton}
          />

          <div
            className={`valign-wrapper gap-1 flex-wrap ${isMobile && "justify-center"
              }`}
            style={{ marginBottom: isDastop ? "1rem" : 0 }}
          >
            <AuctionFilterSelector setAuctionFilter={setAuctionFilter} />
            <SearchInput
              searchData={searchData}
              setSearchData={setSearchData}
            />
          </div>
        </div>

        <AuctionList
          homePageButton={homePageButton}
          searchData={searchData}
          auctionFilter={auctionFilter}
        />
      </div>
    </div>
  );
}

export default AuctionStatus;
