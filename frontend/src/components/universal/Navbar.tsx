import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/imgNavbar/navbarLogo.png';
import House from '../img/imgNavbar/House.png';
import ProfileBtn from '../img/imgNavbar/ProfileBtn.png';
import './Navbar.css'
import { useState } from 'react';
import { motion } from 'framer-motion'
import { useAuth } from '../../context/ContextProvider';


const Navbar = () => {

  const { token, setToken } = useAuth();
  const [menuVisible, setMenuVisible] = useState("closed");


  const menuVariants = {
    open: { right: "0rem" },
    closed: { right: "-40rem" }
  };


  const toggleMenu = () => {
    setMenuVisible(prevState => (prevState === "open" ? "closed" : "open"));
  };

  const handleLogout = () => {
    setToken(null);
    console.log(token)
  };

  return (
    <nav className='navbar'>
      <div className="navbar-container">
        <div className="logo-container">
          <img className='logo-img' src={logo} alt="Navbar Logo" />
        </div>
        <ul className='navbar-ul'>
          {/* 
            <li className='navbar-li'>
                <NavLink className='navlink' to="/">Om Oss </NavLink>
            </li>
            <li className='navbar-li'>
                <NavLink className='navlink' to="/">Hyr Ut <img className='house-logo' src={House} alt="" /></NavLink>
            </li>
            */}
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
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/">Bostäder</NavLink>
            </li>
            
            <span className='divider'></span>
            {token && (
              <>
                <li className='hamburger-li'>
                  <NavLink className='navlink-burger' onClick={toggleMenu} to="/mina-ansokningar">Mina ansökningar</NavLink>
                </li>
                <span className='divider'></span>
              </>
            )}

            {/* ... your other links ... */}
            <li className='hamburger-li'>
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/kontakt">Kontakt</NavLink>
            </li>
            <span className='divider'></span>
            <li className='hamburger-li'>
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/villkor">Villkor</NavLink>
            </li>
            <span className='divider'></span>
            <li className='hamburger-li'>
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/hyr-ut">Hyr ut</NavLink>
            </li>
            <span className='divider'></span>
          </ul>

          {token ? (
            <button className='logout-btn' onClick={handleLogout}>
              LOGGA UT
            </button>
          ) : (
            <>
              <button className='login-btn'>
                <NavLink className='navlink-account' onClick={toggleMenu} to="/login">
                  LOGGA IN
                </NavLink>
              </button>
              <button className='login-btn'>
                <NavLink className='navlink-account' onClick={toggleMenu} to="/registration">
                  REGISTRERA DIG
                </NavLink>
              </button>
            </>
          )}
        </motion.div>
      </div>
    </nav>
  );

}

export default Navbar;
