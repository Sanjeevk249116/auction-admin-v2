import React, { useState } from "react";
import { DatePicker } from "react-materialize";
import { useMediaQuery } from "react-responsive";
import responseList from "../../../jsonData/responseList.json";
import { notifyError, notifySuccess } from "../../../helper/helpers";
import { useNavigate } from "react-router-dom";

function ResponseField({ auctionDate }) {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 730px)" });
  const [addResponseStore, setAddResponseStore] = useState("");
  const [storeOfferData, setStoreOfferData] = useState([...responseList]);
  const [responseStore, setResponseStore] = useState({
    inspectionCompletedDate: "",
    response: [],
  });

  const handleDateChange = (date, name) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const selectedDate = new Date(date);
    const lastDateObj = new Date(auctionDate);

    if (selectedDate > lastDateObj) {
      notifyError("Selected date cannot be after the Auction Date.");
      return;
    }

    setResponseStore({
      ...responseStore,
      [name]: formattedDate,
    });
  };

  const handleShowData = (name) => {
    const value = document.querySelector(`#${name}`);
    value.click();
  };

  const handleAddResponse = () => {
    if (addResponseStore === "") {
      return;
    }
    setStoreOfferData([
      ...storeOfferData,
      { id: storeOfferData?.length + 1, offer: addResponseStore, status: true },
    ]);
    setResponseStore({
      ...responseStore,
      response: [...responseStore?.response, addResponseStore],
    });
    setAddResponseStore("");
  };

  const handleToggleStatus = (_id) => {
    const updatedOfferData = storeOfferData?.map((offer) =>
      offer.id === _id ? { ...offer, status: !offer?.status } : offer
    );
    setStoreOfferData(updatedOfferData);
    const selectedOffers = updatedOfferData
      ?.filter((offer) => offer?.status)
      ?.map((offer) => offer.offer);

    setResponseStore({
      ...responseStore,
      response: selectedOffers,
    });
  };

  const validation = () => {
    const isDateValid = responseStore?.inspectionCompletedDate !== "";
    const isResponseValid = responseStore?.response?.length > 0;
    return isDateValid && isResponseValid;
  };

  const getMaxDate = () => {
    const today = new Date(auctionDate);
    return auctionDate ? new Date(today?.setDate(today.getDate() - 1)) : null;
  };

  const getMinDate = () => {
    return new Date(new Date().setDate(new Date().getDate() + 1));
  };

  const handleSubmit = () => {
    if (validation()) {
      notifySuccess("reponse submit successfully");
      navigate("/inspectionStatus");
    } else {
      notifyError("Please complete all required fields.");
    }
  };

  return (
    <div
      className={`cover ${!isMobile && " "}`}
      style={{ padding: isTablet ? "1rem" : "2rem " }}
    >
      <div className="flex column" style={{ gap: "12px" }}>
        {storeOfferData?.map((item, index) => (
          <div key={item.id} className="valign-wrapper space-between">
            <p className="valign-wrapper gap-1">
              <span
                className="material-icons-outlined cercle-purple-text pointer"
                onClick={() => handleToggleStatus(item?.id)}
              >
                {item?.status ? "check_box" : "check_box_outline_blank"}
              </span>
              {item?.offer}
            </p>
          </div>
        ))}
        <div
          className={`mt-2 valign-wrapper  ${isMobile ? " gap-2" : "gap-4"}`}
        >
          <span style={{ width: isMobile ? "90%" : "700px" }}>
            <label className="black-text font-16px">
              Other Response <span className="red-text">*</span>
            </label>
            <input
              className="input-tag-style grey lighten-4 margin-0px"
              type="text"
              value={addResponseStore}
              placeholder="Add more Response"
              onChange={(e) => setAddResponseStore(e.target.value)}
            />
          </span>
          <button
            className={`button-style white-text cercle-purple pointer`}
            style={{ padding: "13px 40px", marginTop: "1.5rem" }}
            onClick={() => handleAddResponse()}
          >
            Add
          </button>
        </div>
        <span
          className="pin-top mt-1"
          style={{ width: isMobile ? "90%" : "400px" }}
        >
          <label className="font-16px black-text">
            Inspection Date <span className="red-text">*</span>
          </label>
          <DatePicker
            id="InspectionDate"
            role="input"
            type="date"
            name={"inspectionCompletedDate"}
            value={responseStore?.inspectionCompletedDate}
            onChange={(date) => {
              handleDateChange(date, "inspectionCompletedDate");
              document.body.style.overflowY = "auto";
            }}
            options={{
              minDate: getMinDate(),
              maxDate: getMaxDate(),
            }}
            className="input-tag-style grey lighten-4 margin-0px"
            required
          />
          <span
            className="material-icons-outlined logo-Date-time pointer"
            onClick={() => handleShowData("InspectionDate")}
          >
            calendar_month
          </span>
        </span>
      </div>
      <div className="flex justify-center mt-3">
        <button
          className={`button-style ${
            responseStore.inspectionCompletedDate === "" ||
            responseStore?.response?.length <= 0
              ? "cover grey-text grey  lighten-2"
              : "white-text cercle-purple"
          } pointer`}
          style={{ padding: "12px 35px" }}
          onClick={handleSubmit}
          disabled={
            responseStore.inspectionCompletedDate === "" ||
            responseStore?.response?.length < 0
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ResponseField;
