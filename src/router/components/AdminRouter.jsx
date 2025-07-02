import React from "react";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import FrameStructure from "../../layout/FrameStructure";
import Dashboard from "../../pages/dashboard/Dashboard";
import Pickup from "../../pages/pickup/Pickup";
import SingleOfferDetails from "../../pages/singleOffer/SingleOfferDetails";
import OfferBidsDetails from "../../pages/singleOffer/OfferBidsDetails";
import InspectionStatus from "../../pages/InpectionResponse/InspectionStatus";
import InspectionResponse from "../../pages/InpectionResponse/component/InpectionResponse";
import SubcriptionPages from "../../pages/subscriptions/SubcriptionPages";
import CreateSubscription from "../../pages/subscriptions/components/CreateSubscription";
import ProfileDetails from "../../pages/profile/ProfileDetails";
import SubscriptionDetails from "../../pages/subscriptions/components/SubscriptionDetails";
import Transcation from "../../pages/transcation/Transcation";
import InspectionDetails from "../../pages/InpectionResponse/InspectionDetails";
import ArchiveSubscription from "../../pages/subscriptions/components/ArchiveSubscription";
import SingleAuctionDetails from "../../pages/singleOrganization/buyer/AuctionDetail/SingleAuctionDetails";
import SingleOrganizationType from "../../pages/singleOrganization/SingleOrganizationType";
import AllSellerCollection from "../../pages/organizationCategory/AllSellerCollection";
import AllTraderCollection from "../../pages/organizationCategory/AllTraderCollection";
import Wallet from "../../pages/wallet/Wallet";
import WalletAccount from "../../pages/wallet/components/WalletAccount";
import CatelogTraderList from "../../pages/singleOrganization/buyer/AuctionDetail/components/CatelogTraderList";
import CateloguePage from "../../pages/singleOrganization/buyer/AuctionDetail/catelogue/CateloguePage";
import CatalogueDowloadBy from "../../pages/singleOrganization/buyer/AuctionDetail/tables/CatalogueDowloadBy";
import CatelogueViewBy from "../../pages/singleOrganization/buyer/AuctionDetail/tables/CatelogueViewBy";
import CatelogueAcceptedBy from "../../pages/singleOrganization/buyer/AuctionDetail/tables/CatelogueAcceptedBy";
import CatelogueViewPdf from "../../pages/singleOrganization/buyer/AuctionDetail/catelogue/catelogueViewOnly/CatelogueViewPdf";
import TodayLiveAuction from "../../pages/liveRoom/TodayLiveAuction";
import InviteNewSeller from "../../pages/organizationCategory/components/InviteNewSeller";
import LiveRoomForLots from "../../pages/liveRoom/component/LiveRoomForLots";
import AllNotificationComponent from "../../pages/notification/components/AllNotificationComponent";
import PriceApproval from "../../pages/singleOrganization/buyer/AuctionDetail/children/PriceApproval";
import ReschedulesAuction from "../../pages/reschedule/ReschedulesAuction";
import CatalogueRejectedBy from "../../pages/singleOrganization/buyer/AuctionDetail/tables/CatalogueRejectedBy";
import SingleCompletedAuction from "../../pages/completedAuction/SingleCompletedAuction";
import AuctionReport from "../../pages/auctionReport/AuctionReport";
import SaleIntimation from "../../pages/commanPage/saleIntimation/SaleIntimation";
import PageNotFound from "../../pages/commanPage/PageNotFound";
import Payemd from "../../pages/payemd/Payemd";
import PaySusbcription from "../../pages/singleOrganization/buyer/paySubscription/PaySusbcription";
import AdminList from "../../pages/admin/AdminList";
import CoordinatorPage from "../../pages/coordinator/CoordinatorPage";
import SingleCoordinatore from "../../pages/coordinator/components/SingleCoordinatore";
import AddNewTrader from "../../pages/singleOrganization/buyer/AuctionDetail/children/AddNewTrader";
import BidderActivity from "../../pages/liveRoom/children/BidderActivity";
import InviteNewTrader from "../../pages/organizationCategory/components/InviteNewTrader";
import LotDetailsEditor from "../../pages/singleOffer/updateLotComponent/LotDetailsEditor";
import SelectAuctionType from "../../pages/createAuction/SelectAuctionType";
import CreateLotWithForwardAuction from "../../pages/createOffer/CreateLotWithForwardAuction";
import CreateReverseServiceLotWithAuction from "../../pages/createOffer/CreateReverseServiceLotWithAuction";
import CreateReverseProductLotWithAuction from "../../pages/createOffer/CreateReverseProductLotWithAuction";
import SingleServiceAuctionDetails from "../../pages/singleOrganization/buyer/AuctionDetail/SingleServiceAuctionDetails";
import SingleProductAuctionDetails from "../../pages/singleOrganization/buyer/AuctionDetail/SingleProductAuctionDetails";
import ServiceAuctionPayEmd from "../../pages/payemd/ServiceAuctionPayEmd";
import PriceApprovalForService from "../../pages/singleOrganization/buyer/AuctionDetail/children/PriceApprovalForService";
import ProductAuctionPayEmd from "../../pages/payemd/ProductAuctionPayEmd";
import PriceApprovalForProduct from "../../pages/singleOrganization/buyer/AuctionDetail/children/PriceApprovalForProduct";
import AddNewProductTrader from "../../pages/singleOrganization/buyer/AuctionDetail/children/AddNewProductTrader";
import AddNewServiceTrader from "../../pages/singleOrganization/buyer/AuctionDetail/children/AddNewServiceTrader";
import SingleServiceOfferDetail from "../../pages/singleOffer/SingleServiceOfferDetail";
import SingleProductOfferDetail from "../../pages/singleOffer/SingleProductOfferDetail";
import CompletedServiceAuction from "../../pages/completedAuction/CompletedServiceAuction";
import CompletedProductAuction from "../../pages/completedAuction/CompletedProductAuction";
import EditForwardAuction from "../../pages/editAuction/EditForwardAuction";
import EditReverseServiceAuction from "../../pages/editAuction/EditReverseServiceAuction";
import EditReverseProductAuction from "../../pages/editAuction/EditReverseProductAuction";
import UpdateProductLot from "../../pages/singleOffer/updateLotComponent/UpdateProductLot";
import UpdateServiceLot from "../../pages/singleOffer/updateLotComponent/UpdateServiceLot";
import ReverseCataloguePage from "../../pages/singleOrganization/buyer/AuctionDetail/catelogue/reverseCatalogue/ReverseCataloguePage";
import ProductLiveRoomForLots from "../../pages/liveRoom/component/ProductLiveRoomForLots";
import ServiceLiveRoomForLots from "../../pages/liveRoom/component/ServiceLiveRoomForLots";
import ConfirmationSelectedAccount from "../../pages/transcation/component/ConfirmationSelectedAccount";


export const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <FrameStructure />
      </Suspense>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/single-organization-detail/:id",
        element: <SingleOrganizationType />,
      },
      {
        path: "/single-organization-detail/:id/:auctionId",
        element: <SingleOrganizationType />,
      },
      { path: "/select-auction/type/create-auction/:id", element: <SelectAuctionType /> },
      { path: "/forward-auction/edit-lots-detail/:auctionId/:offerId", element: <LotDetailsEditor /> },
      { path: "/reverse-product-auction/edit-lots-detail/:auctionId/:offerId", element: <UpdateProductLot /> },
      { path: "/service-reverse-auction/edit-lots-detail/:auctionId/:offerId", element: <UpdateServiceLot /> },
      { path: "/reschedule-auction/:industryID/:id", element: <ReschedulesAuction /> },
      { path: "/pickup", element: <Pickup /> },
      { path: "/forward-auction/auction-details/:id", element: <SingleAuctionDetails /> },
      { path: "/reverse-service-auction/auction-details/:id", element: <SingleServiceAuctionDetails /> },
      { path: "/reverse-product-auction/auction-details/:id", element: <SingleProductAuctionDetails /> },
      { path: "/forward-auction/edit-single-auction/:id", element: <EditForwardAuction /> },
      { path: "/reverse-auction/service/edit-single-auction/:id", element: <EditReverseServiceAuction /> },
      { path: "/reverse-auction/product/edit-single-auction/:id", element: <EditReverseProductAuction /> },
      { path: "/completed/forward-auction/auction-details/:id", element: <SingleCompletedAuction /> },
      { path: "/completed/reverse-service-auction/auction-details/:id", element: <CompletedServiceAuction /> },
      { path: "/completed/reverse-product-auction/auction-details/:id", element: <CompletedProductAuction /> },
      { path: "/forward-Auction/price-approval/:id", element: <PriceApproval /> },
      { path: "/reverseAuction/service/price-approval/:id", element: <PriceApprovalForService /> },
      { path: "/reverseAuction/product/price-approval/:id", element: <PriceApprovalForProduct /> },
      {
        path: "catalogue-detail/:id",
        element: <CateloguePage />,
      },
      {
        path: "/reverse-service-auction/catalogue-detail/:id",
        element: <ReverseCataloguePage />,
      },
      {
        path: "/reverse-auction-product/catalogue-detail/:id",
        element: <ReverseCataloguePage />,
      },
      {
        path: "/auction-report/:id",
        element: <AuctionReport />,
      },
      {
        path: "catalogue-view/:id",
        // element: <CatelogView />,
        element: <CatelogueViewPdf />,
      },
      {
        path: "/forward-auction/trader/pay-emd/:id",
        element: <Payemd />,
      },
      {
        path: "/service-auction/trader/pay-emd/:id",
        element: <ServiceAuctionPayEmd />,
      },
      {
        path: "/product-auction/trader/pay-emd/:id",
        element: <ProductAuctionPayEmd />,
      },
      {
        path: "single-organization/buyer/paySubscription/:OrganID",
        element: <PaySusbcription />,
      },
      {
        path: "single-auction/downloadBy/:id/:catalogueId",
        element: <CatalogueDowloadBy />,
      },
      {
        path: "single-auction/viewBy/:id/:catalogueId",
        element: <CatelogueViewBy />,
      },
      {
        path: "single-auction/acceptedBy/:id/:catalogueId",
        element: <CatelogueAcceptedBy />,
      },
      {
        path: "single-auction/rejectedBy/:id/:catalogueId",
        element: <CatalogueRejectedBy />,
      },
      {
        path: "catelogue-traderlist/:id",
        element: <CatelogTraderList />,
      },
      {
        path: "/forward-auction/singleOffer/:id/:offerId",
        element: <SingleOfferDetails />,
      },
      {
        path: "/service-reverse-auction/singleOffer/:id/:offerId",
        element: <SingleServiceOfferDetail />,
      },
      {
        path: "/product-reverse-auction/singleOffer/:id/:offerId",
        element: <SingleProductOfferDetail />,
      },
      {
        path: "/offerBids/:id/:offerId",
        element: <OfferBidsDetails />,
      },
      {
        path: "/forward-auction/single-auction/add-new-trader/:id",
        element: <AddNewTrader />,
      },
      {
        path: "/reverse-service/single-auction/add-new-trader/:id",
        element: <AddNewServiceTrader />,
      },
      {
        path: "reverseAuction/product/single-auction/add-new-trader/:id",
        element: <AddNewProductTrader />,
      },
      {
        path: "/view/sale-intimation/:fileId",
        element: <SaleIntimation />,
      },
      {
        path: "wallet/:id",
        element: <Wallet />,
      },
      {
        path: "wallet/wallet-account/:id",
        element: <WalletAccount />,
      },
      {
        path: "/create-auction-lots/forward/:id",
        element: <CreateLotWithForwardAuction />,
      },
      {
        path: "/reverseAuction/service/create-auction-lots/:id",
        element: <CreateReverseServiceLotWithAuction  />,
      },
      {
        path: "/reverseAuction/product/create-auction-lots/:id",
        element: <CreateReverseProductLotWithAuction />,
      },
      {
        path: "/seller-collection",
        element: <AllSellerCollection />,
      },
      {
        path: "/invite-seller",
        element: <InviteNewSeller />,
      },
      {
        path: "/trader-collection",
        element: <AllTraderCollection />,
      },
       {
        path: "/invite-trader",
        element: <InviteNewTrader />,
      },
      {
        path: "/transaction",
        element: <Transcation />,
      },
      {
        path: "/withdrawal-confirmation",
        element: <ConfirmationSelectedAccount />,
      },
      {
        path: "/inspectionStatus",
        element: <InspectionStatus />,
      },
      {
        path: "/inpection-details",
        element: <InspectionDetails />,
      },
      {
        path: "inspectList/response/:id",
        element: <InspectionResponse />,
      },
      {
        path: "subscription",
        element: <SubcriptionPages />,
      },
      { path: "subscriptionDetails/:id",
         element: <SubscriptionDetails /> },
      {
        path: "archive-subscription",
        element: <ArchiveSubscription />,
      },
      {
        path: "create-subscription",
        element: <CreateSubscription />,
      },
      {
        path: "subscription-details/:id",
        element: <SubscriptionDetails />,
      },
      {
        path: "/live-auctions",
        element: <TodayLiveAuction />
      },
      {
        path: "/forward-auction/live-room/:id/:catalogueId",
        element: <LiveRoomForLots />
      },
      {
        path: "/reverse-service-auction/live-room/:id/:catalogueId",
        element: <ServiceLiveRoomForLots />
      },
      {
        path: "/reverse-product-auction/live-room/:id/:catalogueId",
        element: <ProductLiveRoomForLots />
      },
      {
        path: "/live-room/bidder-acitvity/:id",
        element: <BidderActivity />
      },
      {
        path: "coordinator",
        element: <CoordinatorPage />,
      },
      {
        path: "single-coordinatore/:id",
        element: <SingleCoordinatore />,
      },
      {
        path: "notification",
        element: <AllNotificationComponent />,
      },
      {
        path: "profile",
        element: <ProfileDetails />,
      },
      {
        path: "admin-list",
        element: <AdminList />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
