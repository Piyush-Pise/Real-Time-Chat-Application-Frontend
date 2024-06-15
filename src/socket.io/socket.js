import io from "socket.io-client";
import { WSserverURL } from "../links";

let socket;

export const getSocket = () => {
  if (!socket) {
    const token = sessionStorage.getItem("token");

    socket = io(WSserverURL, {
      auth: {
        token,
      },
    });
    console.log("Creating new socket!!!");
  }
  return socket;
};


export const clearSocket = () =>
{
  console.log("deleting socket object!!!");
  socket = null;
}