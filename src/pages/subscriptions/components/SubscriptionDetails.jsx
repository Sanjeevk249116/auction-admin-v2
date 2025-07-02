import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeEveryFirstLetter } from "../../../helper/helpers";
import CreateSubscription from "./CreateSubscription";
import { Modal } from "react-materialize";
import SubscriptionDetailSkelton from "../../commanPage/loader/SubscriptionDetailSkelton";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSubscription } from "../../../redux/action/subscription";


function SubscriptionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isDastop = useMediaQuery({ query: "(max-width: 1630px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1330px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 950px)" });
  const isSmallTablet = useMediaQuery({ query: "(max-width: 700px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const { singleSubscriptionDetails, subscriptionLoading } = useSelector(
    (pre) => pre?.susbcription
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const viewDetailsFunctionality = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getSingleSubscription(id));
  }, [dispatch, id]);



  return (
    <div className="mt-1">
      {subscriptionLoading ? (
        <SubscriptionDetailSkelton />
      ) : (
        <>
          <div className="valign-wrapper space-between">
            <span className="valign-wrapper gap-1">
              <span
                className="material-icons-outlined pointer"
                onClick={() => navigate(-1)}
              >
                arrow_back
              </span>
              <h4>Subscription</h4>
            </span>
            <button
              className={`button-style pointer cercle-purple-text font-weight-600 font-18px font-cercular-bold`}
              style={{
                padding: "5px 25px",
                border: "1px solid #6f2da8",
              }}
              onClick={viewDetailsFunctionality}
            >
              Edit Subscription
            </button>
          </div>

          <div className={`flex column gap-1 ${isDastop ? "" : "container"}`}>
            <div className="flex justify-center mt-2">
              <b className={`valign-wrapper font-16px`}>
                <span className="material-icons-outlined cercle-purple-text mr-1">
                  info
                </span>
                You will be billed ₹ {Math.floor(singleSubscriptionDetails?.price)}{" "}
                monthly for participation in the cerclex auction.
              </b>
            </div>
            <div
              className={`cover ${isMobile ? "p-1" : isSmallTablet ? "p-2" : "grid-2"
                } white`}
            >
              <span
                className={`valign-wrapper justify-center column ${isTablet ? "p-1" : "p-2"
                  }`}
              >
                <b className="cercle-purple-text">Wallet Transactions</b>
                <p className="font-16px" style={{ padding: "5px 15px" }}>
                  Your wallet transaction was smooth and secure. Enjoy instant payments without hassle! 💳⚡
                </p>
              </span>
              <div
                className="valign-wrapper pin-top"
                style={{ width: !isLaptop && "80%" }}
              >
                {!isSmallTablet && (
                  <p
                    style={{
                      height: "100%",
                      width: "2px",
                      border: "1px solid #eaeaf1",
                    }}
                  ></p>
                )}
                <p
                  className={`ml-3 fontstyle font-16px bold ${isTablet ? "p-1" : "p-2"
                    }`}
                >
                  Exclusively utilize the Cerclex wallet for all transactions to
                  benefit from secure transactions, seamless payment processing,
                  and access to exclusive discounts and offers.
                </p>
              </div>
            </div>
            <div className={`cover white p-2`}>
              <span
                className="material-icons-outlined border-1px circle cercle-purple-text"
                style={{ padding: "5px" }}
              >
                check_box
              </span>
              <b className="font-weight-600 font-20px ml-2">
                You have chosen this plan.
              </b>
              <div
                className={`flex mt-1 ${isLaptop ? "justify-center gap-2" : "space-between"
                  } flex-wrap`}
              >
                <div
                  className="p-1 border-1px border-radius-12  z-depth-2 pin-top"
                  style={{ zIndex: "1", width: "400px", height: "140px" }}
                >
                  <p
                    className=" font-18px lenar-gradiant white-text mb-1"
                    style={{
                      padding: "5px 25px",
                      borderRadius: "8px",
                      // width: "250px",
                    }}
                  >
                    {capitalizeEveryFirstLetter(singleSubscriptionDetails?.name)}
                  </p>
                  <span className="font-30px cercle-purple-text bold">
                    ₹ {Math.floor(singleSubscriptionDetails?.price)}
                  </span>
                  <span>/monthly</span>
                </div>
                <div
                  style={{
                    flex: !isTablet && 0.9,
                    width: isTablet ? "100%" : "312px",
                  }}
                >
                  <p className="font-20px cercle-purple-text mb-1 font-weight-600">
                    Features
                  </p>
                  {singleSubscriptionDetails?.features?.map((item, index) => (
                    <p
                      key={item}
                      className="flex gap-1"
                      style={{ minWidth: !isSmallTablet && "500px" }}
                    >
                      <span className="material-icons-outlined cercle-purple-text">
                        check
                      </span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        style={styles.modal}
        className="modelAccount"
        id="modalView-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <CreateSubscription
          editSubscription={singleSubscriptionDetails}
          setmodel={setIsModalOpen}
          canEdit={true}
        />
      </Modal>
    </div>
  );
}

const styles = {
  modal: {
    width: "65%",
  },
};

export default SubscriptionDetails;
