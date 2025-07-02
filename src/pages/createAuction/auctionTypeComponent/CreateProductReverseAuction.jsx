import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import { checkCorrectLocationFiled, notifyError } from "../../../helper/helpers";
import { getCordinatore } from "../../../redux/action/cordinator";
import SelectCordinatorAndValidity from "../components.jsx/SelectCordinatorAndValidity";
import DatePickers from "../components.jsx/DatePickers";
import TimePickers from "../components.jsx/TimePickers";
import AuctionAreaAndDescription from "../components.jsx/AuctionAreaAndDescription";
import { ClipLoader } from "react-spinners";
import { createProductReverseAuction } from "../../../redux/action/auction";


function CreateProductReverseAuction() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const isDestop = useMediaQuery({ query: "(max-width: 1550px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 600px)" });
  const [isDisabled, setIsDisabled] = useState(false);
  const { createAuctionLoading } = useSelector((state) => state.auction);
  const [auctionDetails, setAuctionDetails] = useState({
    EMDSchedule: { lastDate: "", lastTime: "" },
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
    auctionType: "reverseAuctionProduct",
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

    if (checkCorrectLocationFiled(auctionDetails?.location)) {
      return false;
    }

    return true;
  };

  const handleCreateAuction = (e) => {
    e.preventDefault();
    if (validation(auctionDetails) && handleConditionCheck()) {
      dispatch(
        createProductReverseAuction(id, auctionDetails, setAuctionDetails, navigate)
      ).then(() => {
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
        }, 1000);
      });
    }
  };


  useEffect(() => {
    dispatch(getCordinatore());
  }, [dispatch]);

  useEffect(() => {
    const elems = document.querySelectorAll(".timepicker");
    M.Timepicker.init(elems, {
      defaultTime: "now",
      twelveHour: false,
      autoClose: false,
      onSelect: (hour, minute) => {
        const time = `${hour}:${minute}`;
        console.log(`Selected time: ${time}`);
      },
    });
  }, []);


  return (
    <form onSubmit={handleCreateAuction}>
      <div
        className={`cover white flex column slide-in ${!isDestop && "container"} `}
        style={{
          gap: isTablet ? "30px" : "1.5rem",
          padding: isTablet ? "1rem 2rem 1rem 1.2rem" : "2rem 3.7rem 2rem 3rem",
          width: isTablet ? "100%" : "90%",
          margin: isDestop && "auto",
        }}
      >
        <h5 className="font-20px" style={{ marginBottom: "-8px" }}>
            Auction Details and Validation
          </h5>

        <SelectCordinatorAndValidity
          auctionDetails={auctionDetails}
          setAuctionDetails={setAuctionDetails}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: !isTablet && "1fr 1fr 1fr",
            gap: "30px",
          }}
        >
          <DatePickers
            label={"Auction Date"}
            name={"startDate"}
            modelObject={"auctionSchedule"}
            value={auctionDetails.auctionSchedule.startDate}
            id={"auctionDate"}
            setAuctionDetails={setAuctionDetails}
            lastDate={new Date(new Date().setDate(new Date().getDate() + 365))}
            gapDay={4}
          />

          <TimePickers
            labels={"Start time"}
            name={"startingTime"}
            modelObject={"auctionSchedule"}
            id={"auctionStartTime"}
            setAuctionDetails={setAuctionDetails}
          />

          <TimePickers
            labels={"End time"}
            name={"endingTime"}
            modelObject={"auctionSchedule"}
            id={"auctionEndTime"}
            setAuctionDetails={setAuctionDetails}
          />
        </div>
        <AuctionAreaAndDescription
          auctionDetails={auctionDetails}
          setAuctionDetails={setAuctionDetails}
          description={false}
        />
        <div className="flex column" style={{ gap: "10px" }}>
          <h5 className="font-20px">EMD Details</h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: !isTablet && "1fr 1fr",
              gap: "30px",
            }}
          >
            <span className={`flex column`}>
              <DatePickers
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

            <TimePickers
              labels={"EMD last time"}
              name={"lastTime"}
              modelObject={"EMDSchedule"}
              id={"emdLastTime"}
              setAuctionDetails={setAuctionDetails}
            />
          </div>
          <span className="flex column mt-2">
            <span className="font-18px black-text">Description <span className="red-text">*</span></span>
            <textarea
              className="border-radius-12 textArea-width"
              style={{
                border: "10px solid transparent",
                outline: "2px solid transparent",
                height: "100px",
                backgroundColor: "#F3F7FA",
              }}
              name="description"
              value={auctionDetails?.description}
              onChange={(e) => setAuctionDetails((prev) => ({
                ...prev,
                description: e.target.value,
              }))}
            />
          </span>
        </div>
        <div className={`mt-2 flex justify-center`}>
          <button
            className={`button-style pointer font-20px ${!validation(auctionDetails)
              ? "grey lighten-2"
              : "white-text cercle-purple"
              }`}
            style={{
              padding: "10px 55px",
            }}
            type="submit"
            disabled={!validation(auctionDetails) || isDisabled}
          >
            {createAuctionLoading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateProductReverseAuction;
