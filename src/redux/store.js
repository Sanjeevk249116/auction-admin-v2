import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
  authReducer,
  profileReducer,
} from "./reducer/auth";

import { sellerListReducer } from "./reducer/Seller";
import { tradersListReducer } from "./reducer/traders";
import { auctionReducer, rescheduleAuctionReducer, singleAuctionReducer } from "./reducer/auction";
import { subscriptionReducer } from "./reducer/subscription";
import { tradersWalletReducer, withdrawalRequestReducer } from "./reducer/wallet";
import { singleAccountReducer } from "./reducer/singleAccount";
import { cordinatorReducer } from "./reducer/cordinator";
import { auctionStatusReducer } from "./reducer/auctionStatus";
import {
  catelogueInformationReducer,
  catelogueReducers,
  getCatelogueViewPdfReducer,
} from "./reducer/catelogue";
import { singleOfferReducer } from "./reducer/offers";
import { singleSellerAuctionReducer } from "./reducer/singleSellerAuction";
import { notificationReducer } from "./reducer/notification";
import { verifyAccountReducer } from "./reducer/account";
import { allDocumentsReducer } from "./reducer/document";
import { liveAuctionListReducer } from "./reducer/liveRoom";
import { materialClassificationReducer } from "./reducer/materialClassification";
import { adminAnalyticReducer } from "./reducer/profile";
import { startingPriceApprovalReducer } from "./reducer/price";
import { auctionReportReducer, getAuctionReportViewPdfReducer } from "./reducer/auctionReport";
import { saleIntimationReducer } from "./reducer/saleIntimation";
import { bidderPermissionReducer } from "./reducer/bidPermission";
import { adminReducer } from "./reducer/admin";

const reducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cordinator: cordinatorReducer,
  sellerList: sellerListReducer,
  auctionStatus: auctionStatusReducer,
  tradersList: tradersListReducer,
  singleAuction: singleAuctionReducer,
  auction: auctionReducer,
  admin:adminReducer,
  catelogueData: catelogueReducers,
  susbcription: subscriptionReducer,
  tradersWallet: tradersWalletReducer,
  withdrawalRequest:withdrawalRequestReducer,
  singleAccount: singleAccountReducer,
  catelogueViewPdf: getCatelogueViewPdfReducer,
  catelogueInformation: catelogueInformationReducer,
  singleOfferDetails: singleOfferReducer,
  singleSellerAuction: singleSellerAuctionReducer,
  notifications: notificationReducer,
  verifyAccount: verifyAccountReducer,
  allDocuments: allDocumentsReducer,
  liveAuction: liveAuctionListReducer,
  materialClassification: materialClassificationReducer,
  adminAnalytic: adminAnalyticReducer,
  startingPriceApproval: startingPriceApprovalReducer,
  rescheduleAuction: rescheduleAuctionReducer,
  auctionReport: auctionReportReducer,
  getAuctionReportViewPdf: getAuctionReportViewPdfReducer,
  saleIntimation: saleIntimationReducer,
  bidderPermission:bidderPermissionReducer,
});

const initialstate = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialstate,
  applyMiddleware(...middleware)
);

export default store;
