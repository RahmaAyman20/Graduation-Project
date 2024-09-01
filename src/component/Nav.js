import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { FaListUl } from 'react-icons/fa6';
import './Nav.css'; // Import CSS file for additional styling

function Nav() {
  return (
    <div className="nav-container1">
      <ul>
        <NavLink to="/Categories" className="nav-link" activeClassName="active-link">
          <li><FaListUl /> All Brands</li>
        </NavLink>
        <NavLink to="/Home" className="nav-link" activeClassName="active-link">
          <li>Home</li>
        </NavLink>
        <NavLink to="/History" className="nav-link" activeClassName="active-link">
          <li>History</li>
        </NavLink>
        <NavLink to="/Contact" className="nav-link" activeClassName="active-link">
          <li>Help <IoIosArrowDown /></li>
        </NavLink>
      </ul>
    </div>
    
    
)
}
export default Nav;
