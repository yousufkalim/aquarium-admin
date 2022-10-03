// Init
import React from 'react';
import Button from '@mui/material/Button';

import { NavLink, Link } from 'react-router-dom';
import Logo from '../assets/images/LOGO.svg';
// Component
export default function Header() {
  return (
    <div>
      <nav className="container navbar">
        <div>
          <ul id="menu">
            <li style={{ marginRight: ' 50px' }}>
              <NavLink to="/About" className="nav-item" activeClassName="active-nav-item">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="nav-item" activeClassName="active-nav-item">
                How it works
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="logo">
          <Link to="/">
            {' '}
            <img src={Logo} alt="aquarium_logo" />
          </Link>
        </div>
        <div className="btn">
          <Link to="Login" style={{ textDecoration: 'none' }}>
            <Button className="loginBtn" variant="contained">
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
