import "../css/side-bar.css";
import SideBarHeader from "./SideBarHeader";
import SideBarSearchBar from "./SideBarSearchBar";
import ChatElementCard from "./ChatElementCard";
import NewChatForm from "./NewChatForm";
import { memo, useState } from "react";

const SideBar = memo(function SideBar(prop) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isNewChatDialogBoxOpen, setIsNewChatDialogBoxOpen] = useState(false);
  const ChatList = !filteredUsers.length
    ? prop.roomsData.map((roomData, index) => (
        <ChatElementCard
          key={index}
          roomData={roomData}
          url={"/avatar.svg"}
          newMsg={0}
          time={"11:48"}
          online={true}
          OnChatCardClick={prop.OnChatCardClick}
        />
      ))
    : filteredUsers.map((roomData, index) => (
        <ChatElementCard
          key={index}
          roomData={roomData}
          url={"/avatar.svg"}
          newMsg={0}
          time={"11:48"}
          online={true}
          OnChatCardClick={prop.OnChatCardClick}
        />
      ));

  return (
    <div className="sidebar-container">
      <SideBarHeader
        userName={prop.userName}
        setIsNewChatDialogBoxOpen={setIsNewChatDialogBoxOpen}
      />
      <SideBarSearchBar
        setFilteredUsers={setFilteredUsers}
        roomsData={prop.roomsData}
      />
      <div className="chat-list-container">
        {ChatList.length ? ChatList : "No Chats"}
      </div>
      {isNewChatDialogBoxOpen && (
        <NewChatForm
          setIsNewChatDialogBoxOpen={setIsNewChatDialogBoxOpen}
          roomsData={prop.roomsData}
        />
      )}
    </div>
  );
});

export default SideBar;
