import { io } from "socket.io-client";
import config from "./services/config";

export const socket = io(config.BASE_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return;

  if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
