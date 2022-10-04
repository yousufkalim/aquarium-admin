// Init
import { Grid, Button } from '@mui/material';
import React from 'react';
// import styled from '@mui/material/sty';
import { Link } from 'react-router-dom';
import BG from '../assets/images/BG.svg';
import Logo from '../assets/images/LOGO.svg';
import Mouse from '../assets/images/Mouse.svg';

// Landing Page Component

export default function Landing() {
  return (
    <Grid container spacing={2}>
      <Grid id="heroSection" item xs={12}>
        <img src={BG} className="bgImg" alt="heroImg" />
        <div className="imgTxt">
          <div className="contentOnImg">
            <img src={Logo} className="logoOnImg" alt="Logo" />
            <div className="vl" />
            <h1 className="txtOnImg">Best Aquarium Solutions</h1>
          </div>
          <div className="descriptionOnImg">
            <p className="descriptionTxt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation
            </p>
            <Link to="Login" style={{ textDecoration: 'none' }}>
              <Button className="getStartedBtn" variant="contained">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="mouseImg">
          <img src={Mouse} alt="" />
        </div>
      </Grid>
      <Grid id="howItWorkSection" item xs={12}>
        <h1>How it works</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        </p>
      </Grid>
    </Grid>
  );
}
