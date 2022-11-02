/* eslint-disable indent */
// Init
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

import { NavLink, Link } from 'react-router-dom';
import Logo from '../assets/images/LOGO.svg';

// Component
export default function Navbar() {
  const handleScroll = () => {
    if (window.scrollY > 425) {
      document.getElementById('active-item').style.color = '#28cdff';
    } else {
      document.getElementById('active-item').style.color = 'white';
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="navigationBar">
      <nav className="container navbar">
        <div className="menu">
          <ul id="menu">
            <li style={{ marginRight: ' 50px' }}>
              <NavLink to="/About" className="nav-item">
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-item"
                id="active-item"
                onClick={
                  () =>
                    // eslint-disable-next-line implicit-arrow-linebreak, brace-style
                    {
                      window.scrollTo({
                        top: document.getElementById('howItWorks')
                          .offsetTop,
                        behavior: 'smooth',
                      });
                    }
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                role="presentation"
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
              onClick={
                () =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                // eslint-disable-next-line react/jsx-curly-newline
              }
              role="presentation"
            />
          </Link>
        </div>
        <div className="btn">
          <Link to="/auth/login" style={{ textDecoration: 'none' }}>
            <Button className="loginBtn" variant="contained">
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
