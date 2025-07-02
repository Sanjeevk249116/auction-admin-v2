import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import M from "materialize-css";
import ContactInfoItem from "./children/ContactInfoItem";
import { Modal } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import { getCordinatore } from "../../redux/action/cordinator";
import CordinatorLoader from "../commanPage/loader/CordinatorLoader";
import RerenderContactInfo from "./components/RerenderContactInfo";
import AddCoordinator from "./components/AddCoordinator";



function CoordinatorPage() {
  const collapsible_ref = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLaptop = useMediaQuery({ query: "(max-width: 1550px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 850px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const dispatch = useDispatch();
  const { cordinatorData, cordinatorLoading } = useSelector(
    (state) => state.cordinator
  );

  const viewDetailsFunctionality = (items) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    dispatch(getCordinatore());
  }, [dispatch]);

  const coordinatorData = useMemo(() => cordinatorData, [cordinatorData]);

    useEffect(() => {
      M.Collapsible.init(collapsible_ref.current);
    }, [coordinatorData]);

  return (
    <div className="mt-1">
      <div className="valign-wrapper space-between mb-2">
        <h3>Coordinator</h3>
        <button
          className={`button-style pointer cercle-purple-text font-weight-600 font-18px font-cercular-bold`}
          style={{
            padding: "5px 30px",
            border: "1px solid #6f2da8",
          }}
          onClick={() => viewDetailsFunctionality()}
        >
          Add coordinator
        </button>
      </div>
      {cordinatorLoading ? (
        <CordinatorLoader />
      ) : (
        <ul
          className={`${isTablet ? "collapsible" : ""} ${
            isLaptop ? "" : "container"
          } flex column`}
          style={{ gap: "10px", width: !isLaptop && "80%" }}
          ref={collapsible_ref}
        >
          {coordinatorData?.map((item) => (
            <li
              key={item._id}
              className={`${isTablet ? "" : "cover white pointer"} `}
              style={{
                display: "grid",
                gridTemplateColumns: !isTablet && "1fr 1fr 1fr 1fr 1.3fr 0.1fr",
                alignItems: !isTablet && "center",
                padding: !isTablet && "10px",
              }}
            >
              <div
                className={`${
                  isTablet ? "collapsible-header valign-wrapper pin-top" : ""
                } ${!isMobile && "space-around"}`}
              >
                <span className="valign-wrapper">
                  <img
                    className={`circle ${!isTablet && "ml-1"} mr-1`}
                    width="40px"
                    height="40px"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="profile"
                  />
                  <h6 className="margin-0px">{item.name}</h6>
                </span>
                {isTablet && (
                  <>
                    <ContactInfoItem
                      icon="call"
                      text={item?.phoneNumber}
                      show={!isMobile}
                    />
                    <span
                      className="material-icons-outlined select-label"
                      style={{ right: "10px" }}
                    >
                      expand_more
                    </span>
                  </>
                )}
              </div>
              {isTablet ? (
                <div className="collapsible-body">
                  <div
                    className={`${
                      isMobile
                        ? "flex column gap-1"
                        : "valign-wrapper space-between"
                    }`}
                  >
                    <RerenderContactInfo item={item} isCollapsible={true} />
                  </div>
                </div>
              ) : (
                <RerenderContactInfo item={item} />
              )}
            </li>
          ))}
        </ul>
      )}

      <Modal
        actions={[]}
        bottomSheet={false}
        fixedFooter={false}
        className="modelAccount"
        id="modalView-details"
        open={isModalOpen}
        options={{
          onCloseEnd: closeModal,
        }}
      >
        <AddCoordinator setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
}

export default CoordinatorPage;
