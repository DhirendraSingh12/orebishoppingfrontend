import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import IconMapper from "../IconMapper/IconMapper";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(location.pathname);

  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= 1000 || window.innerHeight <= 720
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1000 || window.innerHeight <= 720);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = () => {
    navigate("/login");
  };
  const handleItemClick = (path) => {
    setActiveItem(path);
    if (isMobileView) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isMobileView ? (
        <>
          <div className={`sidebar-popup ${isOpen ? "open" : ""}`}>
            <div className="sidebar-content">
              <div className="sidebar-header">
                <div className="popup-sidebar1">
                  <div
                    onClick={toggleSidebar}
                    className="toggleMenu"
                    style={{ color: "black" }}
                  >
                    <img src="/assets/logo/hirefleX247.com-dark.png" />
                  </div>
                  <div className="close-icon-sidebar" onClick={toggleSidebar}>
                    <IconMapper iconName={"close"} isFontAwesome={true} />
                  </div>
                </div>
                <hr />
                <div className="slider2">
                  <li className="list-item" onClick={handleItemClick}>
                    <Link to="/dashboard" className="list-item">
                      <IconMapper className="ImageIcons" iconName="Dashboard" />
                      <span className="list-item-text">Employee Dashboard</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleItemClick}>
                    <Link to="/payslips" className="list-item">
                      <IconMapper className="ImageIcons" iconName="ePayslips" />
                      <span className="list-item-text">e-Payslips</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleItemClick}>
                    <Link to="/documents" className="list-item">
                      <IconMapper
                        className="ImageIcons"
                        iconName={"MyDocuments"}
                      />
                      <span className="list-item-text">My Documents</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleItemClick}>
                    <Link to="/perks" className="list-item">
                      <IconMapper className="ImageIcons" iconName={"Perks"} />
                      <span className="list-item-text">My Perks</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleItemClick}>
                    <Link to="/policies" className="list-item">
                      <IconMapper
                        className="ImageIcons"
                        iconName={"CompanyPolicies"}
                      />
                      <span className="list-item-text">Company Policies</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleItemClick}>
                    <Link to="/expenses" className="list-item">
                      <IconMapper
                        className="ImageIcons"
                        iconName={"Expenses"}
                      />
                      <span className="list-item-text">Submit Expenses</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleItemClick}>
                    <Link to="/timeoff" className="list-item">
                      <IconMapper
                        className="ImageIcons"
                        iconName={"TimeOfRequest"}
                      />
                      <span className="list-item-text">Time-Off Request</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleItemClick}>
                    <Link to="/timesheets" className="list-item">
                      <IconMapper
                        className="ImageIcons"
                        iconName={"TimeSheets"}
                      />
                      <span className="list-item-text">My Timesheets</span>
                    </Link>
                  </li>
                </div>
                {/* <div className="popup-slider3">
                  <li
                    className="list-item margin-top-90"
                    onClick={handleItemClick}
                  >
                    <Link to="/account" className="list-item">
                      <IconMapper
                        className="ImageIcons"
                        iconName={"LogoMini"}
                      />
                      <span className="list-item-text">My Account</span>
                    </Link>
                  </li>
                  <li 
                    className="list-item"
                    onClick={() => {
                      handleLogout();
                      if (isMobileView) toggleSidebar(); 
                    }}
                  >
                    <span className="list-item">
                      <IconMapper className="ImageIcons" iconName={"Logout"} />
                      <span className="list-item-text">Logout</span>
                    </span>
                  </li>
                </div> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="sidebar" style={{ width: isOpen ? "18%" : "68px" }}>
          <div className="sidebar-header">
            <div className="slider1">
              <div
                onClick={toggleSidebar}
                className="toggleMenu"
                style={{ color: "black" }}
              >
                <li className="list-items">
                  <IconMapper
                    className="ImageIcon"
                    iconName="bars"
                    isFontAwesome={true}
                  />
                  {isOpen && (
                    <img
                      className="LogoImage"
                      src="/assets/logo/hirefleX247.com-dark.png"
                    />
                  )}
                </li>
              </div>
            </div>
            <div className="slider2">
              <li
                className={`list-item ${
                  activeItem === "/dashboard" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/dashboard")}
              >
                <Link to="/dashboard" className="list-item">
                  <IconMapper className="ImageIcons" iconName="Dashboard" />
                  {isOpen && (
                    <span className="list-item-text">Employee Dashboard</span>
                  )}
                </Link>
              </li>
              <li  className={`list-item ${
                  activeItem === "/payslips" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/payslips")}>
                <Link to="/payslips" className="list-item">
                  <IconMapper className="ImageIcons" iconName="ePayslips" />
                  {isOpen && <span className="list-item-text">e-Payslips</span>}
                </Link>
              </li>
              <li  className={`list-item ${
                  activeItem === "/documents" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/documents")}>
                <Link to="/documents" className="list-item">
                  <IconMapper className="ImageIcons" iconName={"MyDocuments"} />
                  {isOpen && (
                    <span className="list-item-text">My Documents</span>
                  )}
                </Link>
              </li>
              <li  className={`list-item ${
                  activeItem === "/perks" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/perks")}>
                <Link to="/perks" className="list-item">
                  <IconMapper className="ImageIcons" iconName={"Perks"} />
                  {isOpen && <span className="list-item-text">My Perks</span>}
                </Link>
              </li>
              <li  className={`list-item ${
                  activeItem === "/policies" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/policies")}>
                <Link to="/policies" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName={"CompanyPolicies"}
                  />
                  {isOpen && (
                    <span className="list-item-text">Company Policies</span>
                  )}
                </Link>
              </li>
              <li className={`list-item ${
                  activeItem === "/expenses" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/expenses")}>
                <Link to="/expenses" className="list-item">
                  <IconMapper className="ImageIcons" iconName={"Expenses"} />
                  {isOpen && (
                    <span className="list-item-text">Submit Expenses</span>
                  )}
                </Link>
              </li>
              <li className={`list-item ${
                  activeItem === "/timeoff" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/timeoff")}>
                <Link to="/timeoff" className="list-item">
                  <IconMapper
                    className="ImageIcons"
                    iconName={"TimeOfRequest"}
                  />
                  {isOpen && (
                    <span className="list-item-text">Time-Off Request</span>
                  )}
                </Link>
              </li>
              <li className={`list-item ${
                  activeItem === "/timesheets" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/timesheets")}>
                <Link to="/timesheets" className="list-item">
                  <IconMapper className="ImageIcons" iconName={"TimeSheets"} />
                  {isOpen && (
                    <span className="list-item-text">My Timesheets</span>
                  )}
                </Link>
              </li>
            </div>
            {/* <div className="slider3">
              <li className="list-item margin-top-90">
                <Link to="/account" className="list-item">
                  <IconMapper className="ImageIcons" iconName={"LogoMini"} />
                  {isOpen && <span className="list-item-text">My Account</span>}
                </Link>
              </li>
              <li
                className="list-item"
                onClick={() => {
                  handleLogout();
                  if (isMobileView) toggleSidebar();
                }}
              >
                <span className="list-item">
                  <IconMapper className="ImageIcons" iconName={"Logout"} />
                  {isOpen && <span className="list-item-text">Logout</span>}
                </span>
              </li>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;