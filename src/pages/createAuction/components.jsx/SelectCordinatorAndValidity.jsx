import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SelectBids from "../children/SelectBids";
import SelectContract from "../children/SelectContract";
import M from "materialize-css";
import { useSelector } from "react-redux";


function SelectCordinatorAndValidity({ setAuctionDetails, auctionDetails }) {
  const isTablet = useMediaQuery({ query: "(max-width: 600px)" });

  const { cordinatorData, cordinatorLoading } = useSelector(
    (state) => state.cordinator
  );
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (cordinatorData && !cordinatorLoading) {
      setIsDataLoaded(true);
      const elems = document.querySelectorAll("select");
      M.FormSelect.init(elems, {});
    }
  }, [cordinatorData, cordinatorLoading]);

  const handleChange = (event) => {
    const selectedCoordinators = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setAuctionDetails((prevDetails) => ({
      ...prevDetails,
      auctionCoordinators: selectedCoordinators,
    }));
  };

  return (
    <div className="flex column gap-2">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: !isTablet && "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        <span className="">
          <p className="font-16px black-text">
            Select Co-ordinator <span className="red-text">*</span>
          </p>
          <div className="input-tag-style blue-background">
            <select
              multiple
              value={auctionDetails.auctionCoordinators}
              onChange={handleChange}
            >
              <option disabled value="">
                Choose your option
              </option>
              {isDataLoaded &&
                cordinatorData?.map((item) => (
                  <React.Fragment key={item?._id}>
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  </React.Fragment>
                ))}
            </select>
          </div>
        </span>
        <SelectBids
          auctionDetails={auctionDetails}
          setAuctionDetails={setAuctionDetails}
        />
        <SelectContract
          auctionDetails={auctionDetails}
          setCreateOffer={setAuctionDetails}
        />
      </div>
    </div>
  );
}

export default SelectCordinatorAndValidity;
