
import { NavLink } from 'react-router-dom';
import logo from '../img/imgNavbar/navbarLogo.png';
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
    closed: { right: "-55rem" }
  };


  const toggleMenu = () => {
    setMenuVisible(prevState => (prevState === "open" ? "closed" : "open"));
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log(token)
  };

  const handleLogoutAndToggleMenu = () => {
    handleLogout();
    toggleMenu();
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

            {token && (
              <>
                <li className='hamburger-li'>
                  <NavLink className='navlink-burger' onClick={toggleMenu} to="/min-profil">MINA SIDOR</NavLink>
                </li>
                <span className='divider'></span>
                <li className='hamburger-li'>
                  <NavLink className='navlink-burger' onClick={toggleMenu} to="/mina-ansokningar">MINA ANSÖKNINGAR</NavLink>
                </li>
                <span className='divider'></span>

              </>
            )}
            <li className='hamburger-li'>
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/">LEDIGA BOSTÄDER</NavLink>
            </li>
            <span className='divider'></span>
      
            <li className='hamburger-li'>
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/kontakt">KONTAKT</NavLink>
            </li>
            <span className='divider'></span>
            <li className='hamburger-li'>
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/villkor">VILLKOR</NavLink>
            </li>
            <span className='divider'></span>
            <li className='hamburger-li'>
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/hyr-ut">HYR UT</NavLink>
            </li>
            <span className='divider'></span>
            <li className='hamburger-li'>
              <NavLink className='navlink-burger' onClick={toggleMenu} to="/om-oss">OM OSS</NavLink>
            </li>
            <span className='divider'></span>
          </ul>

          {token ? (
            <div className="btn-group-menu">
              <button className='logout-btn' onClick={handleLogoutAndToggleMenu} >
                LOGGA UT
              </button>
            </div>

          ) : (
            <>
              <div className="btn-group-menu">
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
              </div>

            </>
          )}
        </motion.div>
      </div>
    </nav>
  );

}

export default Navbar;
