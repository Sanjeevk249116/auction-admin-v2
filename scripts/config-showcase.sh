rm ./src/redux/config/config.js

touch ./src/redux/config/config.js

echo "export const authenticationService = {
  baseURL: 'https://api.authentication.thinktrash.co',
};

export const auctionService = {
  baseURL: 'https://showcase.auction.api.thinktrash.co/auction',
};

export const geteWayAuctionServer = {
  baseURL: 'https://showcase.auction.api.thinktrash.co'
};
;
" >>./src/redux/config/config.js

npm i --legacy-peer-deps


