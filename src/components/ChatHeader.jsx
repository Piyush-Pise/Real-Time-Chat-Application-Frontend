import { memo } from "react";
import "../css/chat-header.css";

const ChatHeader = memo(function ChatHeader(prop) {
  return (
    <>
      <div className="chat-header-container">
        <div className="profile-picture"></div>
        <div className="profile-name">{prop.activeRoom.roomName}</div>
      </div>
    </>
  );
});

export default ChatHeader;
