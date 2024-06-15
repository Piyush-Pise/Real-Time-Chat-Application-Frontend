import { memo, useEffect, useRef, useState } from "react";
import "../css/chat-body.css";
import Message from "./Message";
import useSocket from "../custom hooks/useSocket";

const ChatBody = memo(function ChatBody(prop) {
  console.log("ChatBody rendered");
  const socket = useSocket();
  const textareaRef = useRef(null);
  const chatSectionRef = useRef(null);

  const [messageStack, setMessageStack] = useState([]);

  function adjustHeight() {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 250)}px`;
  }

  function formatTime(dateString) {
    const date = new Date(dateString);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes to two digits
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Format hours to two digits
    const formattedHours = hours < 10 ? "0" + hours : hours;

    return `${formattedHours}:${minutes} ${ampm}`;
  }

  useEffect(() => {
    socket.on("messages array for roomId", (data) => {
      data.forEach((message) => {
        message.time = formatTime(message.time);
      });
      setMessageStack(data);
    });
    return () => {
      socket.off("messages array for roomId");
    };
  }, [socket]);

  useEffect(() => {
    // Check if the chatSectionRef.current is available
    if (!chatSectionRef.current) return;

    // Smooth scroll to the bottom
    chatSectionRef.current.scrollTo({
      top: chatSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatSectionRef.current?.children.length]);

  useEffect(() => {
    socket.emit("get messages array for roomId", prop.activeRoom.roomId);
  }, [socket, prop.activeRoom.roomId]);

  useEffect(() => {
    socket.on("message from server", (data) => {
      if (data.roomId !== prop.activeRoom.roomId) return;
      data.time = formatTime(data.time);
      setMessageStack((messageStack) => {
        return [...messageStack, data];
      });
    });

    return () => {
      socket.off("message from server");
    };
  }, [messageStack, socket, prop.userName, prop.activeRoom]);

  let messageStackArray = messageStack.map((obj, index) => {
    return (
      <Message
        key={index}
        messageId={obj.messageId}
        message={obj.content}
        isThisMsgMine={obj.from === prop.userName}
        time={obj.time}
      />
    );
  });

  const HandleMessageSend = () => {
    console.log("message sent");

    // setMessageStack([
    //   ...messageStack,
    //   {
    //     content: textareaRef.current.value,
    //     isThisMsgMine: true,
    //     time: getTime(),
    //   },
    // ]);

    socket.emit("message form socket", {
      roomId: prop.activeRoom.roomId,
      content: textareaRef.current.value,
      from: prop.userName,
      time: new Date().toString(),
    });
    textareaRef.current.value = "";
  };

  return (
    <div className="chat-body-container">
      <div className="chat-body-section" ref={chatSectionRef}>
        {messageStackArray}
      </div>
      <div className="chat-input">
        <textarea
          ref={textareaRef}
          // value={message}
          className="roboto-regular"
          placeholder="Type a message here.."
          onInput={adjustHeight}
        ></textarea>
        <button className="send" onClick={HandleMessageSend}>
          {/* <span class="material-symbols-outlined">send</span> */}
        </button>
      </div>
    </div>
  );
});

export default ChatBody;
