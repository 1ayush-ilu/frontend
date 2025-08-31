import { io } from "socket.io-client";

const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const socket = io(backendUrl, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;

