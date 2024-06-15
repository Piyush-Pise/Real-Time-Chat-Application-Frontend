import { useCallback, useEffect, useMemo, useState } from "react";
import "../css/new-chat-form.css";
import FilteredUsersCard from "./FilteredUsersCard";
import useSocket from "../custom hooks/useSocket";

export default function NewChatForm(prop) {
  const socket = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsersArray, setFilteredUsersArray] = useState([
    // { userName: "abhishek", userId: "1" },
    // { userName: "abhijeet", userId: "1" },
    // { userName: "abhirit", userId: "1" },
    // { userName: "abhicup", userId: "1" },
    // { userName: "diljit", userId: "1" },
    // { userName: "kumar", userId: "1" },
  ]);
  const [roomName, setRoomName] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    socket.on("filtered users", (data) => {
      let dataCopy;
      if (!isCreatingGroup) {
        dataCopy = data.filter(
          (user) =>
            !prop.roomsData.find(
              (roomData) => roomData.roomName === user.userName
            )
        );
      } else {
        dataCopy = [...data];
      }
      setFilteredUsersArray(dataCopy);
      setIsLoading(false);
    });
    return () => {
      socket.off("filtered users");
    };
  }, [isCreatingGroup, prop.roomsData, socket]);

  function onSearchButtonClick() {
    if(searchTerm === "")
    {
      return;  
    }
    socket.emit("search users", searchTerm);
    setIsLoading(true);
  }

  function HandleCreateChatRoom() {
    if (!selectedUsers.length) {
      return;
    }
    socket.emit("create room", { roomName, connections: selectedUsers });
  }

  const HandleCardClick = useCallback(
    (userData, isSelected) => {
      const updatedSelectedUsers = isSelected
        ? selectedUsers.filter((user) => user.userId !== userData.userId)
        : !isCreatingGroup && selectedUsers.length > 0
        ? [...selectedUsers]
        : [...selectedUsers, userData];

      console.log(updatedSelectedUsers.length);

      setSelectedUsers(updatedSelectedUsers);
    },
    [selectedUsers, isCreatingGroup]
  );

  const userList = useMemo(() => {
    const userList = filteredUsersArray.map((userData, index) => {
      return (
        <FilteredUsersCard
          key={index}
          index={index}
          isSelected={selectedUsers.find(
            (user) => user.userId === userData.userId
          )}
          userData={userData}
          HandleCardClick={HandleCardClick}
        />
      );
    });
    return userList;
  }, [filteredUsersArray, selectedUsers, HandleCardClick]);

  // const selectedUserList = selectedUsers.map((userData, index) => {
  //   return (
  //     <FilteredUsersCard
  //       key={index}
  //       index={index}
  //       isSelected={true}
  //       isCreatingGroup={isCreatingGroup}
  //       userData={userData}
  //       setSelectedUsers={setSelectedUsers}
  //       selectedUsers={selectedUsers}
  //     />
  //   );
  // });

  return (
    <div className="create-new-room-form-container">
      <div className="create-new-room-form-inner-container">
        <div className="upper-row">
          <h3>New {isCreatingGroup ? "Group" : "Chat"}</h3>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              prop.setIsNewChatDialogBoxOpen((val) => !val);
            }}
          >
            close
          </span>
        </div>
        <div className="options-button-row">
          <button
            className={!isCreatingGroup ? "btn-selected" : "btn-unselected"}
            onClick={() => {
              onSearchButtonClick();
              setIsCreatingGroup(false);
              setSelectedUsers([]);
            }}
          >
            Chat
          </button>
          <button
            className={isCreatingGroup ? "btn-selected" : "btn-unselected"}
            onClick={() => {
              onSearchButtonClick();
              setIsCreatingGroup(true);
              setSelectedUsers([]);
            }}
          >
            Group
          </button>
        </div>
        {/* <h4>Search for a Username</h4> */}
        <div className="search-row">
          <input
            type="text"
            value={searchTerm}
            placeholder="Enter username"
            onInput={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button
            className="material-symbols-outlined"
            onClick={onSearchButtonClick}
          >
            search
          </button>
        </div>
        {/* <div className="selected-users">{selectedUserList}</div> */}
        <div className="search-results">
          {isLoading ? "Fetching..." : userList}
        </div>
        <div className="final-row">
          <button
            className="cancel-button"
            onClick={() => {
              prop.setIsNewChatDialogBoxOpen((val) => !val);
            }}
          >
            Cancel
          </button>
          <button
            disabled={!selectedUsers.length}
            onClick={HandleCreateChatRoom}
            className="chat-button"
          >
            {/* {isCreatingGroup ? "Create" : "Chat"} */}
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
