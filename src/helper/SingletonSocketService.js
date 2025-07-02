import io from "socket.io-client";
import { geteWayAuctionServer } from "../redux/config/config";


let socket;

export const initializeSocket = () => {
    socket = io.connect(geteWayAuctionServer.baseURL, {
        path: "/auction/read/live-lot-updates",
        reconnection: true,
    });

    return socket;
};

export const getSocket = () => {
    // if (!socket) {
    //     throw new Error("Socket not initialized. Call initializeSocket first.");
    // }
    return socket;
};



