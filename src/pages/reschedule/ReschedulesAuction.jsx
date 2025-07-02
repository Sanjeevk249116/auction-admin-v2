import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { checkCorrectLocationFiled, notifyError } from "../../helper/helpers";
import SelectAuctionTypeAndCordinator from "../createAuction/components.jsx/SelectCordinatorAndValidity";
import DatePickers from "../createAuction/components.jsx/DatePickers";
import TimePickers from "../createAuction/components.jsx/TimePickers";
import AuctionAreaAndDescription from "../createAuction/components.jsx/AuctionAreaAndDescription";
import Location from "../commanPage/location/Location"
import { rescheduleAuction } from "../../redux/action/auction";
import RejectedOffer from "./table/RejectedOffer";
import { getCordinatore } from "../../redux/action/cordinator";


function ReschedulesAuction() {
    const dispatch = useDispatch();
    const { industryID, id } = useParams();
    const navigate = useNavigate();
    const isDestop = useMediaQuery({ query: "(max-width: 1550px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 600px)" });
    const [isDisabled, setIsDisabled] = useState(false);
    const [auctionTypeButton, setAuctionTypeButton] = useState(false);
    const { auctionLoading } = useSelector((state) => state.rescheduleAuction);
    const [offers, setOffers] = useState([])
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
            zipCode: ""
        },
        auctionType: "forwardAuction",
        auctionCoordinators: [],
        contractValidity: "",
        bidValidity: "",
        auctionRegion: "",
        auctionMode: "",
        description: "",
    });

    const [values, setValues] = useState({
        location: {
            longitude: "",
            latitude: "",
            address: "",
        },
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
            auctionDetails?.description === "" || offers?.length === 0

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
            dispatch(rescheduleAuction(id, industryID, { auctionDetails, offers }, setAuctionDetails, navigate)).then(
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
        setAuctionDetails((prevEditValue) => ({
            ...prevEditValue,
            inspectionSchedule: {
                ...prevEditValue.inspectionSchedule,
                inspectionLocation: values?.location?.address,
            },
        }));
    }, [values]);

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

    useEffect(() => {
        dispatch(getCordinatore());
    }, [dispatch]);

    return (
        <div className="mt-1">
            <span className="valign-wrapper gap-1 mb-1">
                <span
                    className="material-icons-outlined pointer"
                    onClick={() => navigate(-1)}
                >
                    arrow_back
                </span>
                <h4>Reschedule Auction</h4>
            </span>
            <form onSubmit={handleCreateAuction}>
                <div
                    className={`cover white flex column ${!isDestop && "container"} `}
                    style={{
                        gap: isTablet ? "30px" : "1.5rem",
                        padding: "2rem 3.7rem 2rem 3rem",
                        width: !isDestop && "90%",
                        margin: isDestop && 'auto',

                    }}
                >
                    <h5 className="font-20px" style={{ marginBottom: "-8px" }}>
                        Reschedule Auction Details
                    </h5>

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
                        <DatePickers
                            label={"Auction Date"}
                            name={"startDate"}
                            modelObject={"auctionSchedule"}
                            value={auctionDetails.auctionSchedule.startDate}
                            id={"auctionDate"}
                            setAuctionDetails={setAuctionDetails}
                            lastDate={
                                new Date(new Date().setDate(new Date().getDate() + 365))
                            }
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
                    <div className="flex column" style={{ gap: "10px" }}>
                        <h5 className="font-20px">Inspection Details</h5>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: !isTablet && "1fr 1fr 1fr",
                                gap: "30px",
                            }}
                        >
                            <DatePickers
                                label={"Inspection Date"}
                                name={"endDate"}
                                modelObject={"inspectionSchedule"}
                                value={auctionDetails.inspectionSchedule.endDate}
                                id={"InspectionEndDate"}
                                setAuctionDetails={setAuctionDetails}
                                lastDate={auctionDetails.auctionSchedule.startDate}
                                gapDay={0}
                            />

                            <TimePickers
                                labels={"Visit time from"}
                                name={"startingTime"}
                                modelObject={"inspectionSchedule"}
                                id={"visitTimefrom"}
                                setAuctionDetails={setAuctionDetails}
                            />

                            <TimePickers
                                labels={"Visit time to"}
                                name={"endingTime"}
                                modelObject={"inspectionSchedule"}
                                id={"visitTimeTo"}
                                setAuctionDetails={setAuctionDetails}
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
                            <span style={{ marginRight: "6px" }}>
                                <Location values={values} setValues={setValues} locationName={"Inspection Location"} />
                            </span>
                        </div>
                    </div>
                    <AuctionAreaAndDescription auctionDetails={auctionDetails}
                        setAuctionDetails={setAuctionDetails} />
                    <div>
                        <h5 className="font-20px">Rejected lots lists</h5>
                        <RejectedOffer setOffers={setOffers} />
                    </div>

                    <div className={`mt-1 flex justify-center`}>
                        <button
                            className={`button-style pointer font-18px ${!validation(auctionDetails)
                                ? "grey lighten-2"
                                : "white-text cercle-purple"
                                }`}
                            style={{
                                padding: "8px 35px",
                            }}
                            type="submit"
                            disabled={!validation(auctionDetails) || isDisabled}
                        >
                            {auctionLoading ? (
                                <ClipLoader color="#fff" size={20} />
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

export default ReschedulesAuction;
