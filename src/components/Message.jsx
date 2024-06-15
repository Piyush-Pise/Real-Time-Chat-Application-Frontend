import { memo } from "react";
import "../css/message.css";

const Message = memo(function Message(prop) {
  return (
    <div className={"message-container " + (prop.isThisMsgMine ? "me" : "")}>
      {prop.message}
      <span className="timestamp">{prop.time}</span>
    </div>
  );
});
export default Message;
