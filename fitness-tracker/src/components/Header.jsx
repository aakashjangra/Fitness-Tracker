import React from "react";
import { FaHeartbeat } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <FaHeartbeat />
        <span>FitTrack</span>
      </div>

      <div className="profile">
        <div className="profile-avatar">U</div>
        <span>My Fitness</span>
      </div>
    </header>
  );
};

export default Header;