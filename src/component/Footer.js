import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiYoutube } from 'react-icons/fi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import './Footer.css'; // Import CSS file for additional styling

function Footer() {
  return (
    <>
    <div className='footer-container'>
      <ul className='footer-logo'>
        <li style={{display:"inline"}}><Image src="asset/logo.png" width={50} style={{marginTop: "-35px"}} /></li>
        <li style={{display:"inline-block" , fontSize:"12px"}}><h3>Econfiy</h3></li>        
        <li style={{color:"gray"}}>Best information about the</li>
        <li style={{color:"gray"}}>company goes here but now lorem </li>
        <li style={{color:"gray"}}>ipsum is</li>
        <li ><FaFacebook /> <FaTwitter /> <FaLinkedin /> <FaInstagram /> <FiYoutube /></li>
      </ul>
      <ul>
        <li>About</li>
        <NavLink to="/About" className='nav'> <li className='colgry'>About Us</li></NavLink>
        <NavLink to="/Home" className='nav'><li className='colgry'>Categories</li></NavLink>
      </ul>
      <ul>
        <li>Get Started</li>
        <NavLink to="/Home"className='nav' ><li className='colgry'>Home</li></NavLink>
        <NavLink to="/SignUp"className='nav'><li className='colgry'>Register</li></NavLink>
        <NavLink to="/SignIn"className='nav'><li className='colgry'>Log In</li></NavLink>
      </ul>
      <ul>
        <li>Information</li>
        <NavLink to="/Contact"className='nav'> <li className='colgry'>Help</li></NavLink>
        <NavLink to="/Contact"className='nav'> <li className='colgry'>Contact Us</li></NavLink>
      </ul>
      <ul>
        <li>For User</li>
        <NavLink to="/SignIn"className='nav'><li className='colgry'>Log In</li></NavLink>
        <NavLink to="/SignUp"className='nav'><li className='colgry'>Register</li></NavLink>
        <NavLink to="/Favorites"className='nav'><li className='colgry'>Favorites</li></NavLink>
        <NavLink to="/Setting"className='nav'><li className='colgry'>Setting</li></NavLink>
      </ul>
      <ul>
        <li>Get App</li>
        <li><button className='btn2'><FaApple />App Store</button></li>
        <li><button className='btn2'><FaGooglePlay />Google Play</button></li>
      </ul>
    </div>
    <div className='footer-bottom'>
    <p>© 2024 Ecommerce</p>
    <p>Analysis fake reviews in amazon</p>
  </div>
  </>
  );
}

export default Footer;