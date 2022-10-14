// Init
import React from 'react';
import Button from '@mui/material/Button';

import { NavLink, Link } from 'react-router-dom';
import Logo from '../assets/images/LOGO.svg';
// Component
export default function Navbar() {
  return (
    <div className="navigationBar">
      <nav className="container navbar">
        <div className="menu">
          <ul id="menu">
            <li style={{ marginRight: ' 50px' }}>
              <NavLink to="/About" className="nav-item" activeClassName="active-nav-item">
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-item"
                onClick={
                  () =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    window.scrollTo({
                      top: document.getElementById('howItWorks').offsetTop,

                      behavior: 'smooth',
                    })
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                role="presentation"
                activeClassName="active-nav-item"
              >
                How it works
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="logo">
          <Link to="/">
            {' '}
            <img
              src={Logo}
              alt="aquarium_logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              role="presentation"
            />
          </Link>
        </div>
        <div className="btn">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button className="loginBtn" variant="contained">
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
