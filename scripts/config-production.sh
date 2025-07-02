 rm ./src/redux/config/config.js

touch ./src/redux/config/config.js

echo "export const authenticationService = {
  baseURL: 'https://api.auth.cerclex.com',
};

export const auctionService = {
  baseURL: 'http://3.137.175.54:4020/auction',
};


export const geteWayAuctionServer = {
  baseURL: 'http://3.137.175.54:4020',
};

;
" >>./src/redux/config/config.js

npm i --legacy-peer-deps
