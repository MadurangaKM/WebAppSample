import React, { useState } from "react";
import "./NavBar.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const storedUserData = localStorage.getItem("userData");
  const isLoginPage = window.location.pathname.includes("/login");
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    setIsOpen(!isOpen);
    localStorage.setItem("logout", true);
    return navigate("/login");
  };
  return (
    <div className="mainNav">
      <img src={Logo} alt="Logo" className="logoNav" />
      {storedUserData && !isLoginPage && (
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
                    setIsOpen(!isOpen);
                    return navigate("/contacts");
                  }}
                >
                  My Contacts (Home)
                </li>
                <li
                  onClick={() => {
                    setIsOpen(!isOpen);
                    return navigate("/profile");
                  }}
                >
                  My Profile
                </li>
                <li
                  onClick={() => {
                    setIsOpen(!isOpen);
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
