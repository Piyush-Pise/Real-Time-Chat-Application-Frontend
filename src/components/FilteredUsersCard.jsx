import { memo } from "react";
import "../css/filtered-users-card.css";

const FilteredUsersCard = memo(function FilteredUsersCard(prop) {
  return (
    <div
      className="filtered-users-card"
      style={{
        backgroundColor: prop.isSelected ? "rgb(125,240,125)" : "white",
      }}
      onClick={() => prop.HandleCardClick(prop.userData, prop.isSelected)}
    >
      <div
        style={{
          backgroundImage: `url('/avatar.svg')`,
        }}
      ></div>
      {prop.userData.userName}
    </div>
  );
});

export default FilteredUsersCard;
