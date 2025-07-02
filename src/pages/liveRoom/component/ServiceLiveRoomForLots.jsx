import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll } from "react-scroll";
import throttle from "lodash.throttle";
import SpinnersLoading from "../../commanPage/loader/SpinnersLoading";
import { globalContext } from "../../../context/ContextProvider";
import { initializeSocket } from "../../../helper/SingletonSocketService";
import { Modal } from "react-materialize";
import AuctionTimeExtention from "../children/AuctionTimeExtention";
import BidderActivity from "../children/BidderActivity";
import { getSingleAuctionLiveRoom } from "../../../redux/action/liveRoom";
import ServiceLiveLotsDetails from "../children/ServiceLiveLotsDetails";

function ServiceLiveRoomForLots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, catalogueId } = useParams();
  const isDastop = useMediaQuery({ query: "(min-width: 1550px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1200px)" });
  const [isExtendedTime, setIsExtendedTime] = useState(false);
  const [isBidderTracking, setIsBidderTracking] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const [lotsNumber, setLotsNumber] = useState(1);
  const { liveRoomSingleAuctionData, liveRoomSingleAuctionLoading } =
    useSelector((state) => state.liveAuction);
  const { setLiveRoomConnectionStatus } = useContext(globalContext);
  const lotsContainerRef = useRef(null);
  const lotRefs = useRef({});

  const handleScroll = () => {
    Object.values(lotRefs.current).forEach((section, index) => {
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 1.4) {
          setLotsNumber(index + 1);
        }
      }
    });
  };

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 200);
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  const scrollToLot = (lotNumber) => {
    const targetLotElement = lotRefs.current[lotNumber];
    if (targetLotElement) {
      targetLotElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    dispatch(getSingleAuctionLiveRoom(id));
  }, [dispatch, id]);

  useEffect(() => {
    animateScroll.scrollToTop({ smooth: true });
  }, []);

  useEffect(() => {
    if (liveRoomSingleAuctionData?.offers?.length && lotRefs.current[1]) {
      lotRefs.current[1].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setLotsNumber(1);
    }
  }, [liveRoomSingleAuctionData]);

  useEffect(() => {
    const socket = initializeSocket();

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("joinAuctionRoom", {
        organization: profile?.organization,
        auctionId: id,
      });
      setLiveRoomConnectionStatus(false);
    });

    socket.on("connect_error", (err) => {
      setLiveRoomConnectionStatus(true);
      console.log(err);
    });

    return () => {
      console.log("Disconnecting socket");
      socket.emit("leaveAuctionRoom", {
        organization: profile?.organization,
        auctionId: id,
      });
      setLiveRoomConnectionStatus(true);
      socket.disconnect();
    };
    
  }, [id, setLiveRoomConnectionStatus, profile]);

  if (liveRoomSingleAuctionLoading) {
    return <SpinnersLoading />;
  }

  return (
    <div className="flex column gap-10px">
      <span className="valign-wrapper gap-1 mt-1">
        <span className={`material-icons pointer`} onClick={() => navigate(-1)}>
          west
        </span>
        <h4 className="margin-0px">Live room</h4>
      </span>
      <div style={{ width: isDastop ? "90%" : "100%", margin: "auto" }}>
        <div
          className={`sticky-header`}
          style={{
            position: "sticky",
            top: "3.3rem",
            zIndex: 1,
            background: "#f8f8f8",
            padding: "2rem 1rem 1rem 0rem",
          }}
        >
          <div className="flex column gap-10px mb-2">
            <p className={`font-18px`}>
              Select the Lot number to navigate directly to the Lot.
            </p>

            <span>
              {Array.from(
                { length: liveRoomSingleAuctionData?.offers?.length },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => scrollToLot(page)}
                  className={`livelots-nativation ${
                    page === lotsNumber && "cercle-purple white-text"
                  }`}
                >
                  {page}
                </button>
              ))}
            </span>
          </div>

          <span className="valign-wrapper gap-1">
            <button
              className={`button-style pointer white-text font-16px`}
              style={{
                padding: "8px 10px",
                width: "160px",
                backgroundImage: "linear-gradient(to right, #3C0A67 , #6F2DA8)",
              }}
              onClick={() => navigate(`/catalogue-view/${catalogueId}`)}
            >
              View Catalogue
            </button>
            <button
              className={`button-style pointer white-text font-16px`}
              style={{
                padding: "8px 10px",
                width: "160px",
                backgroundImage:
                  "linear-gradient(to right,rgb(21, 110, 226) , #007be2)",
              }}
              // onClick={() => navigate(`/live-room/bidder-acitvity/${id}`)}
              onClick={() => setIsBidderTracking(true)}
            >
              Bidder Activity
            </button>
            <button
              className={`button-style pointer white-text font-16px`}
              style={{
                padding: "8px 15px",
                backgroundImage:
                  "linear-gradient(to right, #e15129 ,rgb(223, 76, 31))",
              }}
              onClick={() => setIsExtendedTime(true)}
            >
              Extend Auction Time
            </button>
          </span>
        </div>
        <div
          ref={lotsContainerRef}
          className="flex column mt-4"
          style={{
            gap: "6rem",
          }}
        >
          {liveRoomSingleAuctionData?.offers?.map((item, index) => (
            <div
              key={item._id || index}
              ref={(el) => (lotRefs.current[index + 1] = el)}
            >
              <ServiceLiveLotsDetails
                liveOfferData={item}
                index={index}
                singleAuctionData={liveRoomSingleAuctionData?.auction}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        actions={[]}
        bottomSheet={false}
        style={styles.modal}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={isExtendedTime}
        options={{
          onCloseEnd: () => setIsExtendedTime(false),
        }}
      >
        <AuctionTimeExtention
          singleAuctionData={liveRoomSingleAuctionData?.auction}
          singleAuctionLoading={liveRoomSingleAuctionLoading}
        />
      </Modal>
      <Modal
        actions={[]}
        bottomSheet={false}
        style={!isLaptop ? styles.modalActivity : undefined}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={isBidderTracking}
        options={{
          onCloseEnd: () => setIsBidderTracking(false),
        }}
      >
        <BidderActivity />
      </Modal>
    </div>
  );
}

const styles = {
  modal: {
    maxHeight: "80vh",
    overflowY: "auto",
  },
  modalActivity: {
    maxHeight: "80vh",
    width: "1000px",
  },
};
export default ServiceLiveRoomForLots;
