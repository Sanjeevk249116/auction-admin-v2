import React, { useState } from "react";
import { Modal } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { logOut } from "../redux/action/auth";

function Aside({ openAside, setOpenAside }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);
  const { adminData } = useSelector((state) => state.profile);

  const isMatchingRoute = (pathname, routes) => {
    return routes.some((route) => {
      const regex = new RegExp(`^${route.replace(/:\w+/g, "[^/]+")}$`);
      return regex.test(pathname);
    });
  };

  const buyerRoutes = ["/", "/single-auction/:id/:accountType"];
  const buyerRoute = isMatchingRoute(location.pathname, buyerRoutes);

  const subscriptionRoutes = [
    "/subscription",
    "/subscriptionDetails/:Standard",
    "/subscription/successful",
  ];
  const subscriptionRoute = isMatchingRoute(
    location.pathname,
    subscriptionRoutes
  );

  const pickupRoutes = ["/pickup"];
  const pickupRoute = isMatchingRoute(location.pathname, pickupRoutes);

  const InspectionesponseRoutes = ["/inspectionStatus"];
  const InspectionesponseRoute = isMatchingRoute(
    location.pathname,
    InspectionesponseRoutes
  );

  const AuctionSellerRoutes = ["/seller-collection"];

  const AuctionsellerRoute = isMatchingRoute(
    location.pathname,
    AuctionSellerRoutes
  );
  const AuctionTraderRoutes = ["/trader-collection"];

  const AuctionTraderRoute = isMatchingRoute(
    location.pathname,
    AuctionTraderRoutes
  );

  const adminRoutes = ["/admin-list"];
  const adminRoute = isMatchingRoute(location.pathname, adminRoutes);

  const helplineRoutes = ["/coordinator", "/single-coordinatore/:id"];
  const helplineRoute = isMatchingRoute(location.pathname, helplineRoutes);


  const menuItemsForRoutes = [
    { route: "/", label: "Dashboard", icon: "dashboard", active: buyerRoute },
    {
      route: "/seller-collection",
      label: "Seller-List",
      icon: "work_history",
      active: AuctionsellerRoute,
    },
    {
      route: "/trader-collection",
      label: "Buyer-List",
      icon: "apartment",
      active: AuctionTraderRoute,
    },
    {
      route: "/subscription",
      label: "Subscription",
      icon: "subscriptions",
      active: subscriptionRoute,
    },
    // {
    //   route: "/pickup",
    //   label: "Pickup",
    //   icon: "local_shipping",
    //   active: pickupRoute,
    // },
    // {
    //   route: "/inspectionStatus",
    //   label: "Response",
    //   icon: "view_list",
    //   active: InspectionesponseRoute,
    // },
    {
      route: "/coordinator",
      label: "Coordinator",
      icon: "people",
      active: helplineRoute,
    },

    {
      route: "/profile",
      label: "Profile",
      icon: "account_circle",
      active: location.pathname === "/profile",
    },
  ];

  if (adminData?.role?.name === "super_admin") {
    menuItemsForRoutes.splice(3, 0, {
      route: "/admin-list",
      label: "Admin-List",
      icon: "featured_play_list",
      active: adminRoute,
    });
    menuItemsForRoutes.splice(5, 0, {
      route: "/transaction",
      label: "Transaction",
      icon: "receipt_long",
      active: location.pathname === "/transaction",
    });
  }

  if (adminData?.role?.name === "accountant") {
    menuItemsForRoutes.splice(4, 0, {
      route: "/transaction",
      label: "Transaction",
      icon: "receipt_long",
      active: location.pathname === "/transaction",
    });
  }

  return (
    <aside className={openAside ? "aside-list-open" : "aside-list"} style={{ height: "96vh" }}>
      <ul className="aside-items-list">
        {menuItemsForRoutes?.map((item, index) => (
          <li
            key={item?.route}
            className={item.active ? "active-aside-items-list" : ""}
            onClick={() => {
              navigate(item.route);
              setOpenAside(false);
            }}
            data-tooltip-id={`tooltip-${index}`}
          >
            <span className="material-icons-outlined">{item.icon}</span>
            {openAside && <p className="semi-bold">{item.label}</p>}
          </li>
        ))}
      </ul>
      {!openAside &&
        menuItemsForRoutes?.map((item, index) => (
          <ReactTooltip
            key={item?.route}
            id={`tooltip-${index}`}
            place="right"
            content={<p>{item.label}</p>}
          />
        ))}
      <div
        className="flex mb-5 ml-3 align-center full-width"
        href="#modal1"
        onClick={() => setLogout(!logout)}
      >
        <span
          className="material-symbols-outlined icon pointer"
          data-tooltip-id={`${!openAside && "tooltip-logout"}`}
        >
          logout
        </span>
        {openAside && <p className="semi-bold">Logout</p>}
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

            <button className="red btn-small" onClick={() => setLogout(false)}>
              No
            </button>
          </div>
        </Modal>
      </div>
      <ReactTooltip
        id={`tooltip-logout`}
        place="right"
        content={<p>Logout</p>}
      />
    </aside>
  );
}

export default Aside;
