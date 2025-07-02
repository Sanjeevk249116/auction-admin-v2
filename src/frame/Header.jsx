import React, { useState } from "react";
import { Dropdown, Modal } from "react-materialize";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import LiveSearch from "../pages/commanPage/headerSearch/LiveSearch";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/action/auth";
import NotificationHomeComponent from "../pages/notification/NotificationHomeComponent";

function Header({ setOpenAside, openAside, userInfo }) {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 990px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate()
  const { profile } = useSelector((state) => state.profile);
  const [logout, setLogout] = useState(false);


  return (
    <header className="flex align-center space-between white full-width  header ph-1">
      <div className="flex align-center  ">
        <div
          className={
            openAside ? "open-menu-icon pointer" : "menu-icon p-1 pointer"
          }
          onClick={() => setOpenAside(!openAside)}
        >
          {openAside ? (
            <span className="material-symbols-outlined menu-icon icon hover ml-2    ">
              close
            </span>
          ) : (
            <span className="material-symbols-outlined menu-icon icon hover ">
              segment
            </span>
          )}
        </div>
        {!isMobile && <div className="company-profile flex mh-1  align-center ">
          <div className="flex align-center gap-1 ml-1">
            <img
              // src="./images/company-logo.png"
              src="https://i.ibb.co/PTd3s9m/cerclex.png"
              style={{
                width: "45px",
                height: "45px",
              }}
              alt="company logo"
            />
            {!isMobile && (
              <div>
                <h5 className="margin-0px">Cerclex Auction Admin Dashboard</h5>
              </div>
            )}
          </div>
        </div>}
      </div>
      <div className="valign-wrapper align-center ">
        {!isTablet && <LiveSearch />}
        <img
          src="/images/liveLogo.gif"
          width="250px"
          height="120px"
          alt="notification"
          style={{ marginRight: "-40px", paddingTop: "5px" }}
          onClick={() => navigate("/live-auctions")}
        />
        <NotificationHomeComponent />
        {!isLaptop && (
          <Dropdown
            id="profile-headers"
            options={{
              alignment: "right",
            }}
            trigger={
              <div
                className="user-profile flex align-center mr-1"
              // style={{ minWidth: isDastop && "250px" }}
              >
                {!isLaptop ? (
                  <div className="flex align-center gap-1">
                    <img
                      style={{ border: "1px solid purple" }}
                      className="circle"
                      width={"40px"}
                      height={"40px"}
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="profile "
                    />

                    <span>
                      <b className="semi-bold">{profile?.name}</b>
                      <p className="small-size grey-text ">{profile?.email}</p>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            }
            className="user-profile-drop-down "
          >
            <Link to="/profile">
              <div className="flex ml-1 gap-1 ">
                <span className="material-symbols-outlined purple-text">
                  manage_accounts
                </span>
                <p className="semi-bold purple-text ">Account Setting</p>
              </div>
            </Link>
            <span>
              <div
                className="flex ml-1 gap-1"
                href="#modal1"
                // node="button"
                onClick={() => setLogout(!logout)}
              >
                <span className="material-symbols-outlined purple-text">
                  logout
                </span>
                <p className="semi-bold purple-text ">Logout </p>
              </div>
              <Modal
                actions={[]}
                id="modal1"
                open={logout}
                options={{
                  onCloseEnd: () => setLogout(false),
                }}
              >
                <b className="normal-size">Confirm Logout </b>
                <p className="semi-bold">Are you sure you want to logout?</p>
                <div className="flex justify-end gap-1">
                  <button
                    className="green btn-small "
                    onClick={() => dispatch(logOut())}
                  >
                    Yes
                  </button>

                  <button
                    className="red btn-small"
                    onClick={() => setLogout(false)}
                  >
                    No
                  </button>
                </div>
              </Modal>
            </span>
          </Dropdown>
        )}
      </div>
    </header>
  );
}

export default Header;
