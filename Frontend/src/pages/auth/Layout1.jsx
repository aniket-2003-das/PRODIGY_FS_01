  import React from "react";
  import { NavLink, Outlet } from "react-router-dom";
import './main.css'
  

const NavBar = (props) => {
    

    return (
      <div className="navbar-container">
      <ul className="nav-links">
          <li>
              <NavLink to="/" style={({ isActive }) => ({ backgroundColor: isActive ? 'blue':""})}>Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login" style={({ isActive }) => ({ backgroundColor: isActive ? 'blue':""})}>Login</NavLink>
          </li>
      </ul>
      <Outlet/>
  </div>
    );
  };

  export default NavBar;





  