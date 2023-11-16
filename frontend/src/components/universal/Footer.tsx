
import './Footer.css'
import { NavLink } from 'react-router-dom'
import instagramLogo from '../img/imgFooter/insta.png'
import linkedinLogo from '../img/imgFooter/linkedin.png'
import facebookLogo from '../img/imgFooter/facebook.png'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-box">
          <h3 className='footer-h3'>Stöd</h3>
          <ul className='footer-ul left-ul'>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>Hjälpcenter</NavLink>
            </li>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>StudyStayCover</NavLink>
            </li>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>Antidiskriminering</NavLink>
            </li>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>Stöd för funktionsnedsättning</NavLink>
            </li>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>Avbokningsalternativ</NavLink>
            </li>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>Rapportera grannskapsproblem</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-box">
          <h3 className='footer-h3'>Värdskap</h3>
          <ul className='footer-ul middle-ul'>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>Hyr ut ditt boende på StudyStay</NavLink>
            </li>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>StudyStayCover för värdar</NavLink>
            </li>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>Värdresurser</NavLink>
            </li>
            <li className='footer-li'>
              <NavLink className='navlink-footer' to='/'>Community-forum</NavLink>
            </li>
          </ul>
        </div>
        <div className="footer-box">
          <h3 className='footer-h3 right-align'>StudyStay</h3>
          <ul className='footer-ul right-ul'>
            <li className='footer-li right-align'>
              <NavLink className='navlink-footer' to='/'>Pressrum</NavLink>
            </li>
            <li className='footer-li right-align'>
              <NavLink className='navlink-footer' to='/'>Nya funktioner</NavLink>
            </li>
            <li className='footer-li right-align'>
              <NavLink className='navlink-footer' to='/'>Lediga tjänster</NavLink>
            </li>
            <li className='footer-li right-align'>
              <NavLink className='navlink-footer' to='/'>Investerare</NavLink>
            </li>
            <li className='footer-li right-align'>
              <NavLink className='navlink-footer' to='/'>Nödboenden med StudyStay</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copywrite-links">
        <div className="left-copywrite">
          <p>© 2023 StudyStay AB</p>

          <ul className='copywrite-ul'>
            <p>·</p>
            <li className='copywrite-li'>
              <NavLink className='copywrite-link' to='/'>Integritet</NavLink>
            </li>
            <p>·</p>
            <li className='copywrite-li'>
              <NavLink className='copywrite-link' to='/'>Villkor</NavLink>
            </li>
            <p>·</p>
            <li className='copywrite-li'>
              <NavLink className='copywrite-link' to='/'>Sajtkarta</NavLink>
            </li>
            <p>·</p>
            <li className='copywrite-li'>
              <NavLink className='copywrite-link' to='/'>Företagsuppgifter</NavLink>
            </li>
          </ul>
        </div>
        <div className="right-copywrite">
          <div className="social-logo">
            <img className='logo-footer-img' src={facebookLogo} alt="" />
          </div>
          <div className="social-logo">
            <img className='logo-footer-img' src={instagramLogo} alt="" /></div>
          <div className="social-logo">
            <img className='logo-footer-img' src={linkedinLogo} alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer