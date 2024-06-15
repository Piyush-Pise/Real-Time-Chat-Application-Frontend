import "../css/navbar.css";

function NavBar() {
  return (
    <>
      <div className="navbar-container">
        <div className="front">
          <span class="material-symbols-outlined logo"> forum </span>
          <span className="name" >ReChat</span>
        </div>
        <div className="back">
            <div className="theme-toggle"></div>
            <div className="logout-button"></div>
            <div className="profile-picture"></div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
