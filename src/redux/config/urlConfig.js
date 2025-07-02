import axios from "axios";
import { auctionService, authenticationService } from "./config";

function getAuthURL() {
  return `${authenticationService.baseURL}`;
}

function getAuth() {
  let Auth = axios.create(authenticationService);
  const token = localStorage.getItem("CCXT");
  if (token) Auth.defaults.headers.common["X-Authentication-Token"] = token;
  return Auth;
}

function getAuctionUrl() {
  return `${auctionService.baseURL}`;
}

function getAuction() {
  let Auction = axios.create(auctionService);
  const auctionToken = localStorage.getItem("admin_dashboard");

  if (auctionToken)
    Auction.defaults.headers.common["X-Authentication-Token"] = auctionToken;
  return Auction;
}

export const Auth = getAuth();
export const AuthURL = getAuthURL();
export const auction = getAuction();
export const getAuctionURL = getAuctionUrl();
