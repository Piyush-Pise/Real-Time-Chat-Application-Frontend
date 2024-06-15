import ChatSection from "../components/ChatSection";
import SideBar from "../components/SideBar";
import { useState, useEffect, useCallback } from "react";
import { links } from "../links";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../custom hooks/token";
import useSocket from "../custom hooks/useSocket";

function Main() {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState({});
  const [MyData, setMyData] = useState({ userName: "", roomsData: [] });
  // const [activeSessions, setActiveSessions] = useState([]);
  // const [onlineUsers, setOnlineUsers] = useState([]);

  async function VerifyToken() {
    const token = getToken();
    if (!token) {
      console.log("Token verification failed");
      navigate("/login");
      return false;
    }
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get(links.VerifyTokenURI);
      // console.log(res.status);
      if (res.status !== 200) {
        console.log("Token verification failed");
        navigate("/login");
        return false;
      }
      console.log("Token verification successful");
      return true;
    } catch (error) {
      console.log("Error occurred while verifying token:", error);
      navigate("/login");
      return false;
    }
  }

  const socket = useSocket();

  useEffect(() => {
    VerifyToken();
    socket.on("user's data", (Data) => {
      setMyData(Data);
    });

    return () => {
      socket.off("user's data");
      // socket.off("online users");
    };
  }, [socket]);

  const OnChatCardClick = useCallback((roomData) => {
    setCurrentRoom(roomData);
  }, []);

  return (
    <>
      <SideBar
        userName={MyData.userName}
        // onlineUsers={onlineUsers}
        // activeRoom={currentRoom}
        roomsData={MyData.roomsData}
        OnChatCardClick={OnChatCardClick}
      />
      <ChatSection activeRoom={currentRoom} userName={MyData.userName} />
    </>
  );
}

export default Main;
