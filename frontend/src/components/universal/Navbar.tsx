import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/imgNavbar/navbarLogo.png';
import House from '../img/imgNavbar/House.png';
import ProfileBtn from '../img/imgNavbar/ProfileBtn.png';
import './Navbar.css'
import { useState } from 'react';
import { motion } from 'framer-motion'


const Navbar = () => {

  const [menuVisible, setMenuVisible] = useState("closed");


  const menuVariants = {
    open: { right: "0rem" },
    closed: { right: "-40rem" }
  };


  const toggleMenu = () => {
    setMenuVisible(prevState => (prevState === "open" ? "closed" : "open"));
  };

  return (
    <nav className='navbar'>
      <div className="logo-container">
        <img className='logo-img' src={logo} alt="Navbar Logo" />
      </div>
      <ul className='navbar-ul'>
        {/* <li className='navbar-li'>
          <NavLink className='navlink' to="/">Om Oss </NavLink>
        </li>
        <li className='navbar-li'>
          <NavLink className='navlink' to="/">Hyr Ut <img className='house-logo' src={House} alt="" /></NavLink>
        </li> */}
        <li className='navbar-li'>

          <img className='meny' src={ProfileBtn} alt="" onClick={toggleMenu} />
        </li>
      </ul>

      <motion.div
        className="hamburger-menu"
        initial="closed"
        animate={menuVisible}
        variants={menuVariants}
      >

        <ul className='hamburger-ul'>
          <li className='hamburger-li'>
            <NavLink className='navlink-burger' to="/min-profil">Min profil</NavLink>
          </li>
          <span className='divider'></span>
          <li className='hamburger-li'>
            <NavLink className='navlink-burger' to="/bostader">Bostäder</NavLink>
          </li>
          <span className='divider'></span>
          <li className='hamburger-li'>
            <NavLink className='navlink-burger' to="/ansokningar">Ansökningar</NavLink>
          </li>
          <span className='divider'></span>
          <li className='hamburger-li'>
            <NavLink className='navlink-burger' to="/kontakt">Kontakt</NavLink>
          </li>
          <span className='divider'></span>
          <li className='hamburger-li'>
            <NavLink className='navlink-burger' to="/villkor">Villkor</NavLink>
          </li>
          <span className='divider'></span>
          <li className='hamburger-li'>
            <NavLink className='navlink-burger' to="/hyr-ut">Hyr ut</NavLink>
          </li>
          <span className='divider'></span>
        </ul>

        <button className='login-btn'>LOGGA IN</button>

      </motion.div>

    </nav>
  );
}

export default Navbar;
