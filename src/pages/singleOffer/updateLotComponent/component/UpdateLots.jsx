import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  convertTo12HourFormat,
  convertTo24HourFormat,
  convertToISTTime,
  notifyError,
} from "../../../../helper/helpers";
import InputFieldForLots from "../../../createOffer/children/InputFieldForLots";
import LiftingPeriodAndTaxs from "../../../createOffer/children/LiftingPeriodAndTaxs";
import { ClipLoader } from "react-spinners";
import Switch from "../../../utils/Switch";
import { updateLotInformation } from "../../../../redux/action/auction";
import { useNavigate } from "react-router-dom";
import EditLotsTime from "../children/EditLotsTime";

function UpdateLots({ singleAuctionData, loading, singleOfferData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: "(max-width: 1500px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 790px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const [keyValue, setKeyValue] = useState(0);
  const { createAuctionLoading } = useSelector((state) => state.auction);
  const [editLotDetails, setEditLotDetails] = useState({
    EMDAmount: null,
    quantity: null,
    minimumBid: null,
    maximumBid: null,
    description: "",
    unit: "MT",
    checked: false,
    location: "",
    offerStartTime: "",
    offerEndTime: "",
    productType: "",
    liftingPeriod: "",
    ItTCSTaxes: "1",
    GSTTaxes: "18",
    eventFee: null,
  });

  const formatString = (text) => {
    if (typeof text !== "string") return text;
    return text?.replace(/^"|"$/g, "");
  };

  // function convertToISTTime(dateStr) {
  //     const dateObj = new Date(dateStr);
  //     const istDate = new Date(dateObj.getTime());
  //     const hours = String(istDate.getHours()).padStart(2, '0');
  //     const minutes = String(istDate.getMinutes()).padStart(2, '0');
  //     return `${hours}:${minutes}`;
  // }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditLotDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFieldsforDisabled = (fields) => {
    if (!fields?.minimumBid) {
      return false;
    }
    for (let key in fields) {
      if (
        key !== "minimumBid" &&
        key !== "checked" &&
        typeof fields[key] === "string" &&
        !fields[key].trim()
      ) {
        return false;
      }
    }
    return true;
  };

  const validateFields = (fields) => {
    if (
      `${fields?.offerStartTime}:00` <
      convertTo24HourFormat(
        convertTo12HourFormat(
          singleAuctionData?.auctionSchedule?.startingTime
        )
      ) ||
      fields?.offerEndTime >
      convertTo24HourFormat(
        convertTo12HourFormat(singleAuctionData?.auctionSchedule?.endingTime)
      )
    ) {
      notifyError(
        `Lot time must be within the range of ${convertTo12HourFormat(
          singleAuctionData?.auctionSchedule?.startingTime
        )} and ${convertTo12HourFormat(
          singleAuctionData?.auctionSchedule?.endingTime
        )}.`
      );

      return false;
    }

    for (let key in fields) {
      if (key === "EMDAmount" && fields[key] <= 100) {
        notifyError("Emd Amount must be greater than 100");
        return false;
      }
      if (
        key !== "checked" &&
        // key !== "startingPrice" &&
        key !== "maximumBid" &&
        typeof fields[key] === "string" &&
        !fields[key].trim()
      ) {
        notifyError(`The field '${key}' is empty.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields(editLotDetails)) {
      const transformedDetails = {
        ...editLotDetails,
        scrapDetails: {
          type: editLotDetails.productType,
          quantity: editLotDetails.quantity,
          unit: editLotDetails.unit,
        },
        startingTime: editLotDetails.offerStartTime,
        endingTime: editLotDetails.offerEndTime,
      };

      delete transformedDetails.unit;
      delete transformedDetails.productType;
      delete transformedDetails.quantity;
      delete transformedDetails.offerStartTime;
      delete transformedDetails.offerEndTime;

      dispatch(
        updateLotInformation(
          singleAuctionData?._id,
          singleOfferData?._id,
          transformedDetails,
          setKeyValue,
          setEditLotDetails,
          navigate
        )
      );
    }
  };


  useEffect(() => {
    if (singleOfferData) {
      setEditLotDetails({
        EMDAmount: singleOfferData?.EMDAmount,
        quantity: singleOfferData?.scrapDetails?.quantity,
        minimumBid: singleOfferData?.minimumBid,
        maximumBid: singleOfferData?.maximumBid,
        description: singleOfferData?.description,
        unit: singleOfferData?.scrapDetails?.unit,
        checked: singleOfferData?.requiresPCBCertificate,
        location: formatString(singleOfferData?.location),
        offerStartTime: convertToISTTime(singleOfferData?.offerSchedule?.startTimeAndDate),
        offerEndTime: convertToISTTime(singleOfferData?.offerSchedule?.endTimeAndDate),
        productType: singleOfferData?.scrapDetails?.type,
        liftingPeriod: singleOfferData?.liftingPeriod,
        ItTCSTaxes: singleOfferData?.ItTCSTaxes,
        GSTTaxes: singleOfferData?.GSTTaxes,
        eventFee: singleOfferData?.eventFee || 0,
      });
    }
  }, [singleOfferData]);

  return (
    <div
      className={`cover white ${isMobile ? "p-1" : isDesktop ? "p-2" : "container p-2"
        }`}
      key={keyValue}
    >
      <h3 className="flex justify-center cercle-purple-text mb-1 mt-2">
        Update Lots
      </h3>
      <form onSubmit={handleSubmit}>
        <div
          className={`flex column ${isMobile ? "p-1" : isTablet ? "p-2" : "padding-45"
            }`}
          style={{ gap: "1.5rem" }}
        >
          <div
            className={`${isMobile ? "gap-1" : "gap-2"}`}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(1,1fr)" : "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            <span style={{ marginRight: "1.5rem" }}>
              <InputFieldForLots
                label={"EMD Amount"}
                name={"EMDAmount"}
                type={"number"}
                placeholder={"Enter Emd Amount"}
                value={editLotDetails.EMDAmount}
                setCreateOffer={setEditLotDetails}
              />
            </span>
            <span style={{ marginRight: "1.5rem" }}>
              <InputFieldForLots
                label={"Event Fee"}
                name={"eventFee"}
                type={"number"}
                placeholder={"Enter Event Fee"}
                value={editLotDetails.eventFee}
                setCreateOffer={setEditLotDetails}
              />
            </span>
            <span className="flex column pin-top">
              <span className="font-16px black-text">
                Quantity/UOM <span className="red-text">*</span>
              </span>
              <input
                type="number"
                name="quantity"
                placeholder="Enter Quantity"
                value={editLotDetails.quantity}
                onChange={handleInputChange}
                className={`input-tag-style ${isMobile && "input-width"}`}
                required
              />
              <select
                className="browser-default select-label"
                name="unit"
                value={editLotDetails.unit}
                onChange={handleInputChange}
                style={{
                  width: isTablet ? "90px" : "130px",
                  top: "26px",
                  right: isMobile ? "-5px" : "-20px",
                  // backgroundColor: "rgba(157, 44, 255, 0.09)",
                  padding: "0.78rem",
                }}
              >
                <option value="MT">MT</option>
                <option value="KG">KG</option>
                <option value="pieces">pieces</option>
                <option value="lot">lot</option>
                <option value="NOS">Nos</option>
              </select>
            </span>
          </div>

          <div
            className={`${isMobile ? "gap-1" : "gap-2"}`}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(1,1fr)" : "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            <EditLotsTime
              label={"Lot Start time"}
              name={"offerStartTime"}
              editValue={editLotDetails}
              setCreateOffer={setEditLotDetails}
              intervalValue={keyValue}
              timeValue={editLotDetails?.offerStartTime}
            />

            <EditLotsTime
              label={"Lot End time"}
              name={"offerEndTime"}
              editValue={editLotDetails}
              setCreateOffer={setEditLotDetails}
              intervalValue={keyValue}
              timeValue={editLotDetails?.offerEndTime}
            />

            <span>
              <InputFieldForLots
                label={"Minimum increment"}
                name={"minimumBid"}
                type={"number"}
                placeholder={"Enter Minimum Increment"}
                value={editLotDetails.minimumBid}
                setCreateOffer={setEditLotDetails}
              />

            </span>
          </div>
          <LiftingPeriodAndTaxs
            setCreateOffer={setEditLotDetails}
            createOffer={editLotDetails}
          />
          <div
            className={`${isMobile ? "gap-1" : "gap-2"}`}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(1,1fr)" : "repeat(2,1fr)",
              gap: "20px",
            }}
          >
            <span style={{ marginRight: "1.5rem" }}>
              <InputFieldForLots
                label={"Location"}
                name={"location"}
                type={"text"}
                placeholder={"Enter your location"}
                value={editLotDetails.location}
                setCreateOffer={setEditLotDetails}
              />
            </span>

            <InputFieldForLots
              label={"Product Type"}
              name={"productType"}
              type={"text"}
              placeholder={"Enter Product type"}
              value={editLotDetails.productType}
              setCreateOffer={setEditLotDetails}
            />
          </div>
          <span className="flex column">
            <span className="font-18px black-text">
              Description <span className="red-text">*</span>
            </span>
            <textarea
              className="border-radius-12 textArea-width"
              style={{
                border: "10px solid transparent",
                outline: "2px solid transparent",
                height: "100px",
                backgroundColor: "#F3F7FA",
              }}
              value={editLotDetails.description}
              name="description"
              onChange={handleInputChange}
            />
          </span>
          <Switch
            isOn={editLotDetails.checked}
            handleToggle={() =>
              setEditLotDetails((prevState) => ({
                ...prevState,
                checked: !prevState.checked,
              }))
            }
            textName={"This lot Only for PCB verified traders"}
          />

          <div className="valign-wrapper justify-center gap-2 mt-1">
            <button
              className={`button-style pointer font-20px select-wrapper ${validateFieldsforDisabled(editLotDetails)
                ? "cercle-purple white-text"
                : "grey lighten-2 grey-text"
                }`}
              style={{ padding: "8px 30px" }}
              disabled={!validateFieldsforDisabled(editLotDetails)}
            >
              {createAuctionLoading ? (
                <ClipLoader color="red" size={20} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateLots;
