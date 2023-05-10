import { faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBoxesPacking,
  faDashboard,
  faHistory,
  faHome,
  faHotel,
  faMoneyBill,
  faSignOut,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sideBar.css";

const SideBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(window.location.pathname);
  const handleClick = (e) => {
    setActive(e.target.id);
  };

  console.log(active);

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    onLogout();
    navigate("/");
  };

  return (
    <div className='sidebar'>
      <nav
        className='nav flex-column nav-pills nav-fill shadow'
        id='sidebar-nav'>
        <Link className='text-bg-dark nav-link shadow rounded-0'>MAIN</Link>
        <Link
          className={
            active === "home"
              ? "text-bg-info shadow  nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='home'
          to={"/home"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
        <Link
          className={
            active === "users"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='users'
          to={"/user"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faUser} /> Users
        </Link>
        <Link
          className={
            active === "products"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='products'
          to={"/product"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faBoxesPacking} /> Products
        </Link>
        <Link
          className={
            active === "histories"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='histories'
          to={"/history"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faHistory} /> History
        </Link>
        <Link
          className={
            active === "chats"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='chats'
          to={"/chat"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faMessage} /> Chat
        </Link>
        <Link className='text-bg-dark nav-link shadow rounded-0'>NEW</Link>
        <Link
          className={
            active === "newProducts"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='newProducts'
          to={"/newProduct"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faHotel} /> New Product
        </Link>
        {/* <Link
          className={
            active === "newRooms"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          id='newRooms'
          to={"/newRoom"}
          onClick={handleClick}>
          <FontAwesomeIcon icon={faUserFriends} /> New rooms
        </Link> */}
        <Link className='text-bg-dark nav-link shadow rounded-0'>USER</Link>
        <button
          className={
            active === "logOut"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link rounded-0"
          }
          onClick={logoutHandler}>
          <FontAwesomeIcon icon={faSignOut} /> Logout
        </button>
      </nav>
    </div>
  );
};

export default SideBar;
