// Init
import { Grid, Button } from '@mui/material';
import React from 'react';
// import styled from '@mui/material/sty';
import { Link } from 'react-router-dom';
import BG from '../assets/images/BG.svg';
import Logo from '../assets/images/LOGO.svg';
import Mouse from '../assets/images/Mouse.svg';
import Vector from '../assets/images/Vector.svg';

// Landing Page Component

export default function Landing() {
  return (
    <Grid container spacing={2}>
      {/* =========================================hero section================================  */}
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
      {/* ================================How it works section=================================  */}

      <Grid id="howItWorkSection" item xs={8}>
        <Grid item xs={7}>
          <h1 className="mainHeading">How it works</h1>
          <p className="leftBoxContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation
          </p>
        </Grid>
        <div className="firstNumberedBox">1</div>
        <Grid className="leftBox" item xs={5}>
          <h1 className="card1Heading">COMPLETE AQUARIUM SERVICES</h1>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation
          </p>
        </Grid>
        <img src={Vector} className="vector" alt="" />
      </Grid>

      <Grid id="howItWorkSectionCol2" item xs={4}>
        <Grid className="howItWorkSectionCol2" id="howItWorkCol2">
          <div className="numberedBox">2</div>
          <br />
          <h1 className="boxHeading">LEADERS IN THE MARKET</h1>
          <br />
          <p className="boxContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </p>
        </Grid>
        <Grid className="howItWorkSectionCol2">
          <div className="numberedBox">3</div>
          <br />
          <h1 className="boxHeading">OUR AQUACULTURE PROGRAM</h1>
          <br />
          <p className="boxContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
}
