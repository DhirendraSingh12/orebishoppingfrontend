import React, { useState } from "react";
import "./Header.css";
import IconMapper from "../IconMapper/IconMapper";
import { Link, useNavigate } from "react-router-dom";

const profile = "/assets/images/profile.jpg";

const Header = ({ isOpen, toggleSidebar }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const togglePopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    if (isPopupOpen) {
      setIsPopupOpen(false);
    }
  };
  const logout = () => {
    navigate("/superadmin/login");
  };
  return (
    <header className="header" onClick={closePopup}>
      <div className="header-left">
        <IconMapper
          iconName={"bars"}
          isFontAwesome={true}
          className="IconHembar"
          onClick={toggleSidebar}
        />
        <img
          className="logomedia"
          src="/assets/logo/hirefleX247.com-dark.png"
        />
        {!isOpen ? (
          <img
            onClick={toggleSidebar}
            className="HeaderLogoView"
            src="/assets/logo/hirefleX247.com-dark.png"
          />
        ) : (
          <div className="hembarIcon">
            <IconMapper iconName={"bars"} isFontAwesome={true} />
          </div>
        )}
      </div>
      <div className="header-right">
        <div className="name-container" onClick={togglePopup}>
          <h4>Jhon </h4>
          <div className="icon-container">
            <img src={profile} alt="Profile" className="headerprofile" />
          </div>
          {isPopupOpen && (
            <div className="popup">
              <ul>
                <Link to="/account" className="popup-link">
                  <IconMapper iconName="account" isFontAwesome={true} /> Account
                </Link>
                <Link to="/inbox" className="popup-link">
                  <IconMapper iconName="inbox" isFontAwesome={true} /> Inbox
                </Link>
                <Link to="/settings" className="popup-link">
                  <IconMapper iconName="settings" isFontAwesome={true} />{" "}
                  Settings
                </Link>
                <Link to="/login" className="popup-link" onClick={logout}>
                  <IconMapper iconName="logout" isFontAwesome={true} /> Logout
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;



