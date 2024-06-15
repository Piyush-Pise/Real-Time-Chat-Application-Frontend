import "../css/chat-element-card.css";

function ChatElementCard(prop) {
  const style = {
    backgroundImage: `url(${prop.url})`,
  };

  return (
    <div
      className="chat-element-card-container"
      onClick={() => {
        prop.OnChatCardClick(prop.roomData);
      }}
    >
      <div className="chat-element-card-info-part">
        <div
          className={"their-profile-picture" + (prop.online ? " online" : "")}
          style={style}
        ></div>
        <div className="their-profile-name roboto-medium">
          {prop.roomData.roomName}
        </div>
      </div>
      <div className="info-block">
        <div className="time">{prop.time}</div>
        {prop.newMsg > 0 && (
          <div className="new-message-notification">{prop.newMsg}</div>
        )}
      </div>
    </div>
  );
}

export default ChatElementCard;
