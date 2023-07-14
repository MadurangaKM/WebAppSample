import React, { useState } from "react";
import "./NavBar.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const storedUserData = localStorage.getItem("userData");
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="mainNav">
      <img src={Logo} alt="Logo" className="logoNav" />
      {storedUserData && (
        <>
          <div
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={handleToggle}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          {isOpen && (
            <div className="menu">
              <ul>
                <li
                  onClick={() => {
                    return navigate("/contacts");
                  }}
                >
                  My Contacts (Home)
                </li>
                <li
                  onClick={() => {
                    return navigate("/profile");
                  }}
                >
                  My Profile
                </li>
                <li
                  onClick={() => {
                    return navigate("/edit-profile");
                  }}
                >
                  Edit Profile
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NavBar;
