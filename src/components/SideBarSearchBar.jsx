import { memo, useState } from "react";
import "../css/search-bar.css";

const SideBarSearchBar = memo(function SideBarSearchBar(prop) {
  const [searchTerm, setSearchTerm] = useState("");

  // const usernames = prop.roomsData.map((roomData) => {
  //   return roomData.roomName;
  // });

  const usernames = prop.roomsData;

  function handleInputChange(event) {
    const value = event.target.value;
    setSearchTerm(value);
    filterUsernames(value);
  }

  // Filter usernames based on search term
  function filterUsernames(term) {
    if (term === "") {
      prop.setFilteredUsers([]);
      return;
    }

    const filtered = usernames.filter((roomData) =>
      roomData.roomName.toLowerCase().includes(term.toLowerCase())
    );

    // Sort by relevance
    const sorted = filtered.sort((a, b) => {
      // Exact match
      if (a.roomName.toLowerCase() === term.toLowerCase()) return -1;
      if (b.roomName.toLowerCase() === term.toLowerCase()) return 1;

      // Starts with the search term
      if (a.roomName.toLowerCase().startsWith(term.toLowerCase())) return -1;
      if (b.roomName.toLowerCase().startsWith(term.toLowerCase())) return 1;

      // Contains the search term
      if (a.roomName.toLowerCase().includes(term.toLowerCase())) return -1;
      if (b.roomName.toLowerCase().includes(term.toLowerCase())) return 1;

      return 0;
    });

    prop.setFilteredUsers(sorted);
  }

  return (
    <div className="search-bar-container">
      <div className="inner-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a username"
        />
        <span className="material-symbols-outlined">search</span>
      </div>
    </div>
  );
});

export default SideBarSearchBar;
