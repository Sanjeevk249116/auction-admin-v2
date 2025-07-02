import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";
import PickupDateInformation from "./components/PickupDateInformation";
import PickupTimeInformation from "./components/PickupTimeInformation";
import LoadingAssistant from "./components/LoadingAssistant";
import { notifyError, notifySuccess } from "../../../helper/helpers";

function PickupFormDetails({
  sellerId,
  offerDetails,
  setIsModalOpen,
  singleBidDetails,
}) {
  const collapsible_ref = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPickupOpen, setIsPickupOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [keyValue, setKeyValue] = useState(0);

  const [values, setValues] = useState({
    location: {
      longitude: "",
      latitude: "",
      address: "",
    },
  });
  const [pickupDateSelect, setPickupDateSelect] = useState({
    type: "",
    deadLine: "",
    specificDates: [],
  });

  const [pickupTimeSelect, setPickupTimeSelect] = useState({
    type: "",
    startingTime: "",
    timeRange: {
      startTime: "",
      endTime: "",
    },
  });

  const [pickupDetails, setPickupDetails] = useState({
    auction: "",
    offer: "",
    seller: "",
    buyer: "",
    scrapDetails: {
      type: "",
      name: "",
      quantity: "",
      unit: "",
    },
    loadingAssistance: false,
    pickupLocation: {
      latitude: "",
      longitude: "",
      address: "",
      city: "",
      state: "",
      country: "",
      district: "",
    },
    pickupDate: {
      type: "",
      deadLine: "",
      specificDates: [],
    },
    pickupTime: {
      type: "",
      startingTime: "",
      timeRange: {
        startTime: "",
        endTime: "",
      },
    },
  });

  const validationForPickup = () => {
    return !!(
      pickupDetails.auction &&
      pickupDetails.offer &&
      pickupDetails.seller &&
      pickupDetails.buyer &&
      pickupDetails.scrapDetails.type &&
      pickupDetails.scrapDetails.name &&
      pickupDetails.scrapDetails.quantity &&
      pickupDetails.scrapDetails.unit &&
      pickupDetails.pickupLocation.address &&
      pickupDetails.pickupLocation.city &&
      pickupDetails.pickupLocation.state &&
      pickupDetails.pickupDate.type &&
      (pickupDetails.pickupDate.type !== "deadline" ||
        pickupDetails.pickupDate.deadLine) &&
      (pickupDetails.pickupDate.type !== "specificDates" ||
        pickupDetails.pickupDate.specificDates.length > 0) &&
      pickupDetails.pickupTime.type &&
      (pickupDetails.pickupTime.type !== "specificTime" ||
        pickupDetails.pickupTime.startingTime) &&
      (pickupDetails.pickupTime.type !== "range" ||
        (pickupDetails.pickupTime.timeRange.startTime &&
          pickupDetails.pickupTime.timeRange.endTime))
    );
  };

  const handleRaisePickupRequest = async () => {
    if (validationForPickup()) {
      const isValid = timeValidation() && DateSelectionValidation();
      if (isValid) {
        notifySuccess("Raise PickUp Successfully");
      }
    }
  };

  const timeValidation = () => {
    if (pickupDetails.pickupTime.type === "range") {
      const startTime = pickupDetails.pickupTime.timeRange.startTime;
      const endTime = pickupDetails.pickupTime.timeRange.endTime;

      if (startTime && endTime) {
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);

        if (start >= end) {
          notifyError("Start time cannot be Greater than or equal to end time");
          return false;
        }
      }
    }
    return true;
  };

  const DateSelectionValidation = () => {
    if (pickupDetails.pickupDate.type === "specificDates") {
      if (pickupDetails.pickupDate.specificDates.length > 6) {
        notifyError(
          "You can select a maximum of 6 pickup dates only. Please adjust your selection Dates."
        );
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const instance = M.Collapsible.init(collapsible_ref.current, {
      onOpenStart: (el) => {
        if (el.id === "pickup-details") {
          setIsPickupOpen(true);
        } else if (el.id === "time-duration") {
          setIsTimeOpen(true);
        }
      },
      onCloseStart: (el) => {
        if (el.id === "pickup-details") {
          setIsPickupOpen(false);
        } else if (el.id === "time-duration") {
          setIsTimeOpen(false);
        }
      },
    });

    return () => {
      if (instance && instance.destroy) {
        instance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    setPickupDetails({
      ...pickupDetails,
      seller: sellerId,
      buyer: singleBidDetails?.trader?._id,
      auction: offerDetails?.auction,
      offer: offerDetails?._id,
      bid: singleBidDetails?._id,
      scrapDetails: offerDetails?.scrapDetails,
      pickupLocation: values?.location,
      pickupDate: pickupDateSelect,
      pickupTime: pickupTimeSelect,
    });
  }, [
    sellerId,
    singleBidDetails,
    offerDetails,
    values,
    pickupDateSelect,
    pickupTimeSelect,
  ]);

  useEffect(() => {
    setKeyValue(Math.floor(Math.random() * 100));
  }, [singleBidDetails]);

  useEffect(() => {
    if (offerDetails?.location) {
      const { coordinates, type, ...locationWithoutCoordinates } =
        offerDetails.location;
      setValues({ location: locationWithoutCoordinates });
    }
  }, [offerDetails]);

  useEffect(() => {
    setIsButtonDisabled(!validationForPickup());
  }, [pickupDetails]);

  return (
    <div>
      <ul
        className="collapsible flex column gap-1"
        ref={collapsible_ref}
        style={{ border: "none" }}
      >
        <PickupDateInformation
          setValues={setValues}
          values={values}
          isPickupOpen={isPickupOpen}
          id={"pickup-details"}
          keyValue={keyValue}
          setPickupDateSelect={setPickupDateSelect}
        />
        <PickupTimeInformation
          isTimeOpen={isTimeOpen}
          id={"time-duration"}
          keyValue={keyValue}
          setPickupTimeSelect={setPickupTimeSelect}
        />
        <LoadingAssistant
          setPickupDetails={setPickupDetails}
          pickupDetails={pickupDetails}
        />
      </ul>

      <div className="flex justify-center">
        <button
          type="submit"
          className={`button-style ${
            isButtonDisabled ? "grey lighten-2" : "white-text"
          }  mt-2 pointer`}
          style={{
            padding: "10px 35px",
            backgroundImage:
              !isButtonDisabled &&
              "linear-gradient(to right,  #6F2DA8,#3C0A67)",
          }}
          disabled={isButtonDisabled}
          onClick={handleRaisePickupRequest}
        >
          Send Pickup Request
        </button>
      </div>
    </div>
  );
}

export default PickupFormDetails;
