 rm ./src/redux/config/config.js

touch ./src/redux/config/config.js

echo "export const authenticationService = {
  baseURL: 'https://api.authentication.thinktrash.co',
};

export const auctionService = {
  baseURL: 'https://auction-server.thinktrash.co/auction',
};

export const geteWayAuctionServer = {
  baseURL: 'https://auction-server.thinktrash.co'
};
;
" >>./src/redux/config/config.js

npm i --legacy-peer-deps


