/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { NavLink, useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/images/blueLogo.svg';
import logout from '../assets/images/Logout.svg';
import profileDummy from '../assets/images/profileDummy.svg';
import arrowUp from '../assets/images/arrowUp.svg';
import { genMediaUrl } from '../config';
import ProfilePopup from './ProfilePopup';
import { Store } from '../StoreContext';

// eslint-disable-next-line import/no-cycle
import { superadminRoutes, adminRoutes } from '../routes/routes';

const drawerWidth = 300;
export default function Sidebar() {
  const navigate = useNavigate();
  const { admin } = Store();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/auth/login');
  };
  const [updownIconToggle, setupdownIconToggle] = useState({
    key: '',
  });
  const [activeLink, setactiveLink] = useState();
  function toggleIcon(name) {
    setupdownIconToggle((pre) => ({
      ...pre,
      [name]: !updownIconToggle[name],
      key: name,
    }));
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            padding: '0 1%',
            border: 'none',
          },
        }}
        variant="permanent"
        anchor="left"
        className="sideBarAdmin"
      >
        <NavLink
          to="/"
          style={{ textDecoration: 'none', margin: 'auto' }}
          className="sidebarLogo"
        >
          <img
            src={logo}
            style={{
              margin: '16% auto',
              width: '100%',
              marginTop: '11%',
            }}
            className="sidebarLogoImg"
            alt=""
          />
        </NavLink>
        {/* <Divider /> */}

        <List sx={{ flexBasis: '80%' }}>
          <p className="sidebarTxt">Menu</p>
          {admin.role === 'superadmin'
            ? superadminRoutes.map((route) => (
                // eslint-disable-next-line react/jsx-indent
                <NavLink
                  to={route.layout + route.path}
                  style={{ textDecoration: 'none' }}
                  activeClassName="active"
                >
                  <ListItem
                    className="fullListItem"
                    key={route.name}
                    disablePadding
                  >
                    <ListItemButton className="listItem">
                      <ListItemIcon className="M-icon">
                        <img
                          src={route.icon}
                          className="icon"
                          id="icon"
                          alt=""
                        />
                      </ListItemIcon>
                      <ListItemText
                        className="listItem"
                        primary={route.name}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
                // eslint-disable-next-line indent
              ))
            : adminRoutes.map((route) => {
                if (route.name === 'Services') {
                  return (
                    <div>
                      <ListItem
                        className={`fullListItemAdmin ${
                          window.location.pathname.includes(
                            'services',
                          ) && 'activeDropdown'
                        }`}
                        style={
                          activeLink === 'Services'
                            ? {
                                background: '#28cdff',
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'white',
                              }
                            : {
                                display: 'flex',
                                flexDirection: 'column',
                              }
                        }
                        key={route.name}
                        disablePadding
                      >
                        <ListItemButton
                          className="listItem"
                          onClick={() => {
                            toggleIcon(route?.name);
                          }}
                          onKeyDown={() => toggleIcon(route?.name)}
                        >
                          <ListItemIcon className="M-icon">
                            <img
                              src={route.icon}
                              className="icon"
                              id="icon"
                              alt=""
                            />
                          </ListItemIcon>
                          <ListItemText
                            className="listItem"
                            primary={route.name}
                          />

                          <div className="T-btn">
                            {/* eslint-disable-next-line operator-linebreak */}
                            {updownIconToggle[updownIconToggle.key] &&
                            updownIconToggle.key === route?.name ? (
                              <img
                                className="arrow-icon-up"
                                src={arrowUp}
                                alt="arrowUp"
                              />
                            ) : (
                              // eslint-disable-next-line indent
                              // eslint-disable-next-line indent
                              <img
                                className="arrow-icon-up"
                                src={arrowUp}
                                style={{
                                  transform: 'rotateX(180deg)',
                                }}
                                alt="arrowUp"
                              />
                              // eslint-disable-next-line indent
                            )}
                          </div>
                        </ListItemButton>
                        <div
                          className="flex listItem1"
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'center',
                          }}
                        >
                          {updownIconToggle[updownIconToggle.key] &&
                          updownIconToggle.key === route?.name ? (
                            <>
                              <div className="s-vl" />
                              <div
                                className="flex-col"
                                style={{
                                  marginLeft: '50px',
                                  marginTop: '10%',
                                  marginBottom: '10%',
                                }}
                              >
                                {route?.child.map((routeChild) => (
                                  <div
                                    onClick={
                                      () =>
                                        // eslint-disable-next-line implicit-arrow-linebreak
                                        setactiveLink(
                                          routeChild?.name,
                                        )
                                      // eslint-disable-next-line react/jsx-curly-newline
                                    }
                                    onKeyUp={
                                      () =>
                                        // eslint-disable-next-line implicit-arrow-linebreak
                                        setactiveLink(
                                          routeChild?.name,
                                        )
                                      // eslint-disable-next-line react/jsx-curly-newline
                                    }
                                    role="presentation"
                                    className="dropDownLeftBorder"
                                  >
                                    <NavLink
                                      style={{
                                        textDecoration: 'none',
                                      }}
                                      activeClassName="active"
                                      className={
                                        routeChild?.name ===
                                        activeLink
                                          ? 'active-NavLink'
                                          : ''
                                      }
                                      to={`${routeChild.layout}${routeChild?.path}`}
                                    >
                                      <p className="adminServiceDropdown">
                                        {routeChild?.name}
                                      </p>
                                    </NavLink>
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </ListItem>
                    </div>
                  );
                  // eslint-disable-next-line no-else-return
                } else {
                  return (
                    <NavLink
                      to={route.layout + route.path}
                      style={{ textDecoration: 'none' }}
                      activeClassName="active"
                    >
                      <ListItem
                        className="fullListItem"
                        key={route.name}
                        disablePadding
                      >
                        <ListItemButton className="listItem">
                          <ListItemIcon className="M-icon">
                            <img
                              src={route.icon}
                              className="icon"
                              id="icon"
                              alt=""
                            />
                          </ListItemIcon>
                          <ListItemText
                            className="listItem"
                            primary={route.name}
                          />
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  );
                  // eslint-disable-next-line indent
                }
              })}
        </List>
        <div className="profileDiv">
          <p className="sidebarTxt">Profile</p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
            role="presentation"
          >
            <div
              style={{
                marginRight: '7%',
                minWidth: '20%',
                width: '20%',
                height: '51px',
              }}
            >
              <img
                src={genMediaUrl(admin.profile_pic) || profileDummy}
                style={{
                  width: '100%',
                  borderRadius: '50px',
                  height: '100%',
                  objectFit: 'cover',
                }}
                alt=""
              />
            </div>
            <div>
              <h3 className="name">{admin.name}</h3>
              <p className="sidebarTxt">{admin.email}</p>
            </div>
          </div>
          <div>
            <Button
              fullWidth
              variant="contained"
              className="logoutBtn"
              onClick={handleLogout}
            >
              <img
                src={logout}
                style={{ marginRight: '4%' }}
                alt=""
              />
              Log out
            </Button>
          </div>
        </div>
        {open && (
          <ProfilePopup open={open} setOpen={setOpen} admin={admin} />
        )}
      </Drawer>
    </Box>
  );
}
