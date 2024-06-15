import { useNavigate } from "react-router-dom";
import "../css/side-bar-header.css";
import useSocket from "../custom hooks/useSocket";
import { clearToken } from "../custom hooks/token";
import { clearSocket } from "../socket.io/socket";
import { memo } from "react";

const SideBarHeader = memo(function SideBarHeader(prop) {
  const socket = useSocket();

  const navigate = useNavigate();
  return (
    <div className="side-bar-header-container">
      <div className="your-profile-picture"></div>
      <div className="your-profile-name">{prop.userName}</div>
      <div className="options-menu">
        <span
          className="material-symbols-outlined options"
          onClick={() => {
            prop.setIsNewChatDialogBoxOpen((val) => !val);
          }}
        >
          group_add
        </span>
        <span
          className="material-symbols-outlined options"
          onClick={() => {
            clearToken();
            socket.disconnect();
            clearSocket();
            navigate("/login");
          }}
        >
          logout
        </span>
      </div>
    </div>
  );
});

export default SideBarHeader;
