import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleAccount } from "../../../../redux/action/singleAccount";
import { getAllSubscription } from "../../../../redux/action/subscription";
import { useMediaQuery } from "react-responsive";
import SubscriptionLoader from "../../../commanPage/loader/SubscriptionLoader";
import AdminPaySusbcription from "./component/AdminPaySusbcription";
import { Modal } from "react-materialize";
import ConfirmSubscriptionModel from "./component/ConfirmSubscriptionModel";

function PaySusbcription() {
    const navigate = useNavigate();
    const { OrganID } = useParams();
    const dispatch = useDispatch();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const isLaptop = useMediaQuery({ query: "(max-width: 1300px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 800px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const [selectPaySubscription, setSelectPaySubscription] = useState({});
    const { singleAccountdata } = useSelector((state) => state.singleAccount);
    const { subscriptionLoading, subscriptionCollection } = useSelector(
        (state) => state.susbcription
    );

    const handleSelectSubscription = (items) => {
        setSelectPaySubscription((prev) => (prev?._id === items?._id ? {} : items));
    };

    useEffect(() => {
        dispatch(getSingleAccount(OrganID));
        dispatch(getAllSubscription());
    }, [dispatch, OrganID]);

    return (
        <div className="mt-1">
            <span className="valign-wrapper gap-1">
                <span
                    className="material-icons-outlined pointer"
                    onClick={() => navigate(-1)}
                >
                    arrow_back
                </span>
                <span className="valign-wrapper gap-10px">
                    <h4>Pay Subscription - </h4>
                    <p className="font-16px cercle-purple-text">
                        {singleAccountdata?.owner?.email}
                    </p>
                </span>
            </span>

            <div className="cover white p-2 mt-1">
                <span className="valign-wrapper justify-center mr-2 font-25px bold gap-1">
                    <h4 className="mb-2">Choose your right plan!</h4>
                    <img
                        style={{ marginTop: "-10px" }}
                        width="35px"
                        src="/images/subscriptionIcon.png"
                        alt="subscriptionIcon"
                    />
                </span>

                <div
                    className={`mt-1`}
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile
                            ? "repeat(1,1fr)"
                            : isTablet
                                ? "repeat(2,1fr)"
                                : isLaptop
                                    ? "repeat(3,1fr)"
                                    : "repeat(5, 1fr)",
                        columnGap: "1rem",
                        rowGap: "2rem",
                    }}
                >
                    {subscriptionLoading ? (
                        <>
                            {[...Array(subscriptionCollection?.length || 5)].map(
                                (_, index) => (
                                    <SubscriptionLoader key={index} />
                                )
                            )}
                        </>
                    ) : (
                        <>
                            {subscriptionCollection?.map((items, index) => (
                                <AdminPaySusbcription
                                    key={items?._id}
                                    items={items}
                                    selectPaySusbcription={selectPaySubscription}
                                    handleSelectSubscription={handleSelectSubscription}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>

            <div className="valign-wrapper justify-center mt-2">
                <button
                    className={`button-style pointer ${!selectPaySubscription?._id
                            ? "grey lighten-2 grey-text"
                            : "white-text"
                        } font-18px`}
                    style={{
                        padding: "7px 20px",
                        backgroundImage:
                            selectPaySubscription?._id && "linear-gradient(#3C0A67, #6F2DA8)",
                    }}
                    disabled={selectPaySubscription?._id ? false : true}
                    onClick={() => setConfirmModalOpen(true)}
                >
                    Update Subscription
                </button>
            </div>

            <Modal
                actions={[]}
                bottomSheet={false}
                fixedFooter={false}
                className="modelAccount"
                id="modalView-details"
                open={confirmModalOpen}
                options={{
                    onCloseEnd: () => setConfirmModalOpen(false),
                }}
            >
                <ConfirmSubscriptionModel
                    setConfirmModalOpen={setConfirmModalOpen}
                    selectPaySubscription={selectPaySubscription}
                />
            </Modal>
        </div>
    );
}

export default PaySusbcription;
