import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import "../css/chat-section.css";
import { memo } from "react";

const ChatSection = memo(function ChatSection(prop) {
  return (
    <>
      <div className="chat-section-container">
        <ChatHeader activeRoom={prop.activeRoom} />
        {prop.activeRoom.roomId && (
          <ChatBody activeRoom={prop.activeRoom} userName={prop.userName} />
        )}
      </div>
    </>
  );
});

export default ChatSection;
