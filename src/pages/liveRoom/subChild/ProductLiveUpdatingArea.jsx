import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { globalContext } from "../../../context/ContextProvider";
import ConnectionStatus from "../../commanPage/loader/ConnectionStatus";
import { getSocket } from "../../../helper/SingletonSocketService";
import { roundToThreeDecimal } from "../../../helper/helpers";
import { Modal } from "react-materialize";
import UpdateMaximumProductBid from "./UpdateMaximumProductBid";
import UpdateProductStatingPrice from "./UpdateProductStatingPrice";

function ProductLiveUpdatingArea({
  liveOfferData,
  veiwBidDetails,
  setVeiwBidDetails,
  setBidderDetails,
}) {
  const { liveRoomConnectionStatus } = useContext(globalContext);
  const [isOpenUpdateBid, setIsOpenUpdateBid] = useState(false);
  const [isOpenUpdateStartingPrice, setIsOpenUpdateStartingPrice] = useState(false);
  const isDastop = useMediaQuery({ query: "(max-width: 1600px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1300px)" });
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    const socket = getSocket();
    socket?.on("adminNewBid", (data) => {
      if (data?.offerId === liveOfferData?._id) {
        const { bidHistory, ...restData } = data;
        setBidAmount(restData?.mimumestBid);
        setBidderDetails([...bidHistory?.bids].reverse());
      }
    });
  }, [liveOfferData, setBidderDetails]);

  useEffect(() => {
    setBidAmount(liveOfferData?.mimumestBid);
  }, [liveOfferData]);


  if (liveRoomConnectionStatus) {
    return <ConnectionStatus />;
  }

  return (
    <div
      className={`gap-1 ${isLaptop && "valign-wrapper justify-center flex-wrap gap-3"
        }`}
      style={{
        display: !isLaptop && "grid",
        gridTemplateColumns: isLaptop ? "repeat(3,1fr)" : "336px 1.5fr 1fr",
        padding: "2rem",
      }}
    >
      <span className="valign-wrapper space-between">
        <span className="flex column justify-center gap-1">
          <h5 className="font-20px margin-0px valign-wrapper gap-1">
            Max Bid (INR):{" "}
            <span className="cercle-purple-text">
              Rs{" "}
              {liveOfferData?.minimumBidDecrease}
            </span>
          </h5>
          <button
            className={`button-style pointer font-14px white-text red`}
            style={{ padding: "5px 10px", width: "170px" }}
            onClick={() => setIsOpenUpdateBid(true)}
          >
            Update maximum Bid
          </button>
        </span>
        <p className="black" style={{ width: "1px", height: "100%" }}></p>
      </span>

      <span className="valign-wrapper column justify-center gap-1">
        <h5
          className={`font-30px margin-0px cercle-purple-text valign-wrapper gap-10px`}
        >
          <span> Highest Bid </span>
          <span className="material-icons-outlined black-text font-30px">
            arrow_upward
          </span>
        </h5>
        <h6
          className={`white black-text border-1px font-25px margin-0px`}
          style={{ padding: isDastop ? "10px 70px" : "15px 100px" }}
        >
          {roundToThreeDecimal(bidAmount)}
        </h6>
      </span>

      <div className={`valign-wrapper column justify-center gap-10px`}>
        <button
          className={`button-style pointer white-text`}
          style={{ padding: "7px 10px", width: "220px", backgroundColor: "#004aad" }}
          onClick={() => setIsOpenUpdateStartingPrice(true)}
        >
          Update Starting Price
        </button>
        <button
          className={`button-style pointer font-16px white-text cercle-purple`}
          style={{ padding: "8px 30px", width: "220px" }}
          onClick={() => setVeiwBidDetails(!veiwBidDetails)}
        >
          <span className="valign-wrapper gap-10px">
            <span>View Bid Details</span>
            <span className="material-symbols-outlined">
              {veiwBidDetails ? "expand_less" : "expand_more"}
            </span>
          </span>
        </button>
      </div>
      <Modal
        actions={[]}
        open={isOpenUpdateBid}
        options={{
          onCloseEnd: () => setIsOpenUpdateBid(false),
        }}
        className="modelAccount"
      >
        <UpdateMaximumProductBid singleOfferData={liveOfferData} setIsOpenUpdateBid={setIsOpenUpdateBid} tagLotNumber={true} checkFirstBid={bidAmount > 0} />
      </Modal>
      <Modal
        actions={[]}
        open={isOpenUpdateStartingPrice}
        options={{
          onCloseEnd: () => setIsOpenUpdateStartingPrice(false),
        }}
        className="modelAccount"
      >
        <UpdateProductStatingPrice singleOfferData={liveOfferData} setIsOpenUpdateStartingPrice={setIsOpenUpdateStartingPrice} tagLotNumber={true} />
      </Modal>
    </div>
  );
}

export default ProductLiveUpdatingArea;
