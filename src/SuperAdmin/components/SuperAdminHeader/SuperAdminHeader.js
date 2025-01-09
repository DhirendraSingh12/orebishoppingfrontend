import React, { useState } from "react";
import "./SuperAdminHeader.css";
import IconMapper from "../../superadmincompo/IconMapper/IconMapper";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../../assect/images/logo.png";
import ProfileImage from "../../../assect/images/gamtllp.png";


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
    localStorage.removeItem('SuperadminToken');
  };
  return (
    <>
      {" "}
      <header className="SuperAdmin-header" onClick={closePopup}>
        <div className="header-left">
          <IconMapper
            iconName={"bars"}
            isFontAwesome={true}
            className="IconHembar"
            onClick={toggleSidebar}
          />
          <img
            className="logomedia"
            src={logo}
            alt="GAMTLLP"
          />

          {!isOpen ? (
            <img
              onClick={toggleSidebar}
              className="HeaderLogoView"
              src={logo}
              alt="GAMTLLP"
            />
          ) : (
            <div className="hembarIcon">
              <IconMapper iconName={"bars"} isFontAwesome={false} />
            </div>
          )}
        </div>
        <div className="header-right">   
       <div className="super-name-container" onClick={togglePopup}>
            <strong>Team </strong>
            <div className="icon-container">
              <img src={ProfileImage} alt="GAMTLLP" className="headerprofile" />
            </div>
            {isPopupOpen && (
              <div className="popup">
                <ul>
                  <NavLink to="/account" className="popup-link">
                    <IconMapper iconName="account" isFontAwesome={true} />{" "}
                    Account
                  </NavLink>
                  <NavLink to="/inbox" className="popup-link">
                    <IconMapper iconName="inbox" isFontAwesome={true} /> Inbox
                  </NavLink>
                  <NavLink to="/settings" className="popup-link">
                    <IconMapper iconName="settings" isFontAwesome={true} />{" "}
                    Settings
                  </NavLink>
                  <NavLink to="/superadmin/login" className="popup-link" onClick={logout}>
                    <IconMapper iconName="logout" isFontAwesome={true} /> Logout
                  </NavLink>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
