import React, { useContext, useEffect, useRef, useState } from "react";
import {
  RiAccountCircleLine,
  RiArrowLeftSLine,
  RiChat4Line,
  RiDashboardLine,
  RiGroupLine,
  RiLogoutBoxLine,
  RiMenuLine,
} from "@remixicon/react";

import "./navbar.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sideBar = useRef(null);
  const location = useLocation();

  // console.log(location.pathname);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sideBarClick = () => {
    setCollapsed(!collapsed);
  };

  const menuClick = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    if (sideBar.current) {
      sideBar.current.style.height = menuActive
        ? `${sideBar.current.scrollHeight}px`
        : `56px`;
    }
  }, [menuActive]);

  useEffect(() => {
    if (windowWidth >= 1024) {
      sideBar.current.style.height = "100vh";
    } else {
      sideBar.current.style.height = "56px";
      setMenuActive(false);
    }
  }, [windowWidth]);

  return (
    <aside
      ref={sideBar}
      className={
        collapsed && windowWidth >= 1024 ? "sidebar collapsed" : "sidebar"
      }
    >
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Summit Realty" />
        </div>
        <button onClick={sideBarClick} className="sidebar-toggle">
          <RiMenuLine />
        </button>
        <button onClick={menuClick} className="sidebar-toggle-menu">
          <RiMenuLine />
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul className="nav-list primary-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                location.pathname == "/"
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              <span>
                <RiDashboardLine />
              </span>
              <span className="nav-label">Posts</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/users"
              className={
                location.pathname == "/users"
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              <span>
                <RiGroupLine />
              </span>
              <span className="nav-label">Users</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/messages"
              className={
                location.pathname == "/messages"
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
            >
              <span>
                <RiChat4Line />
              </span>
              <span className="nav-label">Messages</span>
            </Link>
          </li>
        </ul>
        <ul className="nav-list secondary-nav">
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>
                <RiAccountCircleLine />
              </span>
              <span className="nav-label">{currentUser.username}</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span>
                <RiLogoutBoxLine />
              </span>
              <span className="nav-label">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Navbar;
