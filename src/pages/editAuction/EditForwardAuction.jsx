import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleAuction, updateAuctionDetails } from "../../redux/action/auction";
import { useMediaQuery } from "react-responsive";
import SelectAuctionTypeAndCordinator from "../createAuction/components.jsx/SelectCordinatorAndValidity";
import EditDatePickers from "./component/EditDatePickers";
import { checkCorrectLocationFiled, editAuctionTimer, handleEditAuctionDate, notifyError } from "../../helper/helpers";
import EditTimePicker from "./component/EditTimePicker";
import Location from "../commanPage/location/Location";
import EditAuctionAreaAndDescription from "./component/EditAuctionAreaAndDescription";
import { ClipLoader } from "react-spinners";
import { getCordinatore } from "../../redux/action/cordinator";

function EditForwardAuction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDestop = useMediaQuery({ query: "(max-width: 1550px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 600px)" });
  const [isDisabled, setIsDisabled] = useState(false);
  const [auctionTypeButton, setAuctionTypeButton] = useState(false);
  const { createAuctionLoading } = useSelector((state) => state.auction);
  const [values, setValues] = useState({
    location: {
      longitude: "",
      latitude: "",
      address: "",
    },
  });
  const { singleAuctionData } = useSelector(
    (state) => state.singleAuction
  );
  const [auctionDetails, setAuctionDetails] = useState({
    EMDSchedule: { lastDate: "", lastTime: "" },
    inspectionSchedule: {
      endDate: "",
      inspectionLocation: "",
      startingTime: "",
      endingTime: "",
    },
    auctionSchedule: {
      startDate: "",
      startingTime: "",
      endingTime: "",
    },
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    auctionType: "forwardAuction",
    auctionCoordinators: [],
    contractValidity: "",
    bidValidity: "",
    auctionRegion: "",
    auctionMode: "",
    description: "",
  });

  const validation = (auctionDetails) => {
    for (const [key, value] of Object.entries(auctionDetails)) {
      if (typeof value === "object") {
        for (const objValue of Object.values(value)) {
          if (typeof objValue === "string" && objValue.trim() === "") {
            return false;
          }
        }
      }
    }
    if (
      auctionDetails?.auctionCoordinators?.length === 0 ||
      auctionDetails?.contractValidity === "" ||
      auctionDetails?.bidValidity === "" ||
      auctionDetails?.auctionRegion === "" ||
      auctionDetails?.auctionMode === "" ||
      auctionDetails?.description === ""
    ) {
      return false;
    }
    return true;
  };

   const handleConditionCheck = () => {
      for (const [scheduleName, schedule] of Object.entries(auctionDetails)) {
        if (["inspectionSchedule", "auctionSchedule"].includes(scheduleName)) {
          const { startingTime, endingTime } = schedule;
          if (startingTime === endingTime) {
            notifyError("Start and End Time should not be same.");
            return false;
          } else if (endingTime < startingTime) {
            notifyError("Start Time should not be greater than End Time.");
            return false;
          }
        }
      }
  
      if(checkCorrectLocationFiled(auctionDetails?.location)){
        return false;
      }
  
      return true;
    };

  const handleEditAuction = (e) => {
    e.preventDefault();
     if (validation(auctionDetails) && handleConditionCheck()) {
          dispatch(updateAuctionDetails(id, auctionDetails, setAuctionDetails, navigate)).then(
            () => {
              setIsDisabled(true);
              setTimeout(() => {
                setIsDisabled(false);
              }, 1000);
            }
          );
        }
  };

  useEffect(() => {
    dispatch(getSingleAuction(id));
     dispatch(getCordinatore());
  }, [dispatch, id]);

  useEffect(() => {
    if (singleAuctionData) {
      setAuctionDetails((prev) => ({
        ...prev,
        auctionSchedule: {
          startDate: handleEditAuctionDate(
            singleAuctionData?.auctionSchedule?.startDate
          ),
          startingTime: editAuctionTimer(
            singleAuctionData?.auctionSchedule?.startingTime
          ),
          endingTime: editAuctionTimer(
            singleAuctionData?.auctionSchedule?.endingTime
          ),
        },
        inspectionSchedule: {
          endDate: handleEditAuctionDate(
            singleAuctionData?.inspectionSchedule?.endDate
          ),
          inspectionLocation:
            singleAuctionData?.inspectionSchedule?.inspectionLocation,
          startingTime: editAuctionTimer(
            singleAuctionData?.inspectionSchedule?.startingTime
          ),
          endingTime: editAuctionTimer(
            singleAuctionData?.inspectionSchedule?.endingTime
          ),
        },
        EMDSchedule: {
          lastDate: handleEditAuctionDate(
            singleAuctionData?.EMDSchedule?.lastDate
          ),
          lastTime: editAuctionTimer(singleAuctionData?.EMDSchedule?.lastTime),
        },
        location: {
          address: singleAuctionData?.location?.address,
          city: singleAuctionData?.location?.city,
          state: singleAuctionData?.location?.state,
          country: singleAuctionData?.location?.country,
          zipCode: "620012",
        },
        contractValidity: singleAuctionData.contractValidity,
        bidValidity: singleAuctionData.bidValidity,

        auctionRegion: singleAuctionData?.auctionRegion,
        auctionMode: singleAuctionData?.auctionMode,
        description: singleAuctionData?.description,
        auctionType:singleAuctionData.auctionType,
        auctionCoordinators: singleAuctionData?.auctionCoordinators || [],
      }));
    }
    setValues((prev) => ({
      location: {
        address: singleAuctionData?.inspectionSchedule?.inspectionLocation,
      },
    }));
  }, [singleAuctionData]);


  useEffect(() => {
    setAuctionDetails((prevEditValue) => ({
      ...prevEditValue,
      inspectionSchedule: {
        ...prevEditValue.inspectionSchedule,
        inspectionLocation: values?.location?.address,
      },
    }));
  }, [values]);

  useEffect(() => {
    if (auctionDetails.auctionType === "forwardAuction") {
      setAuctionTypeButton(false);
    } else {
      setAuctionTypeButton(true);
    }
  }, [auctionDetails]);


  return (
    <div className="mt-1">
      <span className="valign-wrapper gap-1 mb-1">
        <span
          className="material-icons-outlined pointer"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </span>
        <h4>Update Forward Auction</h4>
      </span>
      <form onSubmit={handleEditAuction}>
        <div
          className={`cover white flex column slide-in ${!isDestop && "container"} `}
          style={{
            gap: isTablet ? "30px" : "1.5rem",
            padding: isTablet
              ? "1rem 2rem 1rem 1.2rem"
              : "2rem 3.7rem 2rem 3rem",
            width: isTablet ? "100%" : "90%",
            margin: isDestop && "auto",
          }}
        >
          {/* <h5 className="font-20px" style={{ marginBottom: "-8px" }}>
           Update Auction Details
          </h5> */}

          <SelectAuctionTypeAndCordinator
            auctionDetails={auctionDetails}
            setAuctionDetails={setAuctionDetails}
            setAuctionTypeButton={setAuctionTypeButton}
            auctionTypeButton={auctionTypeButton}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: !isTablet && "1fr 1fr 1fr",
              gap: "30px",
            }}
          >
            <EditDatePickers
              label={"Auction Date"}
              name={"startDate"}
              modelObject={"auctionSchedule"}
              value={auctionDetails?.auctionSchedule?.startDate}
              id={"auctionDate"}
              setAuctionDetails={setAuctionDetails}
              lastDate={
                new Date(new Date().setDate(new Date().getDate() + 365))
              }
              gapDay={0}
            />

            <EditTimePicker
              labels={"Start time"}
              name={"startingTime"}
              modelObject={"auctionSchedule"}
              id={"auctionStartTime"}
              setAuctionDetails={setAuctionDetails}
              timeValue={auctionDetails?.auctionSchedule?.startingTime}
            />

            <EditTimePicker
              labels={"End time"}
              name={"endingTime"}
              modelObject={"auctionSchedule"}
              id={"auctionEndTime"}
              setAuctionDetails={setAuctionDetails}
              timeValue={auctionDetails?.auctionSchedule?.endingTime}
            />
          </div>
          <div className="flex column" style={{ gap: "10px" }}>
            <h5 className="font-20px">Inspection Details</h5>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: !isTablet && "1fr 1fr 1fr",
                gap: "30px",
              }}
            >
              <EditDatePickers
                label={"Inspection Date"}
                name={"endDate"}
                modelObject={"inspectionSchedule"}
                value={auctionDetails.inspectionSchedule.endDate}
                id={"InspectionEndDate"}
                setAuctionDetails={setAuctionDetails}
                lastDate={auctionDetails.auctionSchedule.startDate}
                gapDay={0}
              />

              <EditTimePicker
                labels={"Visit time from"}
                name={"startingTime"}
                modelObject={"inspectionSchedule"}
                id={"visitTimefrom"}
                setAuctionDetails={setAuctionDetails}
                timeValue={auctionDetails?.inspectionSchedule?.startingTime}
              />

              <EditTimePicker
                labels={"Visit time to"}
                name={"endingTime"}
                modelObject={"inspectionSchedule"}
                id={"visitTimeTo"}
                setAuctionDetails={setAuctionDetails}
                timeValue={auctionDetails?.inspectionSchedule?.endingTime}
              />
            </div>
          </div>
          <div className="flex column" style={{ gap: "10px" }}>
            <h5 className="font-20px">EMD Details & Location</h5>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: !isTablet && "1fr 1fr 1fr",
                gap: "30px",
              }}
            >
              <span className={`flex column`}>
                <EditDatePickers
                  label={"EMD Last date"}
                  name={"lastDate"}
                  modelObject={"EMDSchedule"}
                  value={auctionDetails.EMDSchedule.lastDate}
                  id={"EmdLastDate"}
                  setAuctionDetails={setAuctionDetails}
                  lastDate={auctionDetails.auctionSchedule.startDate}
                  gapDay={0}
                />
              </span>

              <EditTimePicker
                labels={"EMD last time"}
                name={"lastTime"}
                modelObject={"EMDSchedule"}
                id={"emdLastTime"}
                setAuctionDetails={setAuctionDetails}
                timeValue={auctionDetails?.EMDSchedule?.lastTime}
              />
              <span style={{ marginRight: "6px" }}>
                <Location
                  values={values}
                  setValues={setValues}
                  locationName={"Inspection Location"}
                />
              </span>
            </div>
          </div>
          <EditAuctionAreaAndDescription
            auctionDetails={auctionDetails}
            setAuctionDetails={setAuctionDetails}
            singleAuctionData={singleAuctionData}
          />

          <div className={`mt-2 flex justify-center`}>
            <button
              className={`button-style pointer font-20px ${
                !validation(auctionDetails)
                  ? "grey lighten-2"
                  : "white-text cercle-purple"
              }`}
              style={{
                padding: "10px 25px",
              }}
              type="submit"
              disabled={!validation(auctionDetails) || isDisabled}
            >
              {createAuctionLoading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Update Auction"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditForwardAuction;
