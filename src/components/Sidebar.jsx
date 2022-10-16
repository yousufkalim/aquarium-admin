import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// import CssBaseline from '@mui/material/CssBaseline';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';

// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from '../assets/images/blueLogo.svg';
import logout from '../assets/images/Logout.svg';
import profileDummy from '../assets/images/profileDummy.svg';

import { Store } from '../StoreContext';

// eslint-disable-next-line import/no-cycle
import { superadminRoutes, adminRoutes } from '../routes/routes';

const drawerWidth = 300;

export default function Sidebar() {
  const { admin } = Store();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/auth/login';
  };

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
      >
        <Link to="/" style={{ textDecoration: 'none' }} className="sidebarLogo">
          <img
            src={logo}
            style={{ margin: '16% auto', width: '70%', marginTop: '11%' }}
            className="sidebarLogoImg"
            alt=""
          />
        </Link>
        {/* <Divider /> */}

        <List>
          <p className="sidebarTxt">Menu</p>
          {admin.role === 'super_admin'
            ? superadminRoutes.map((route) => (
                // eslint-disable-next-line react/jsx-indent
                <Link
                  to={route.layout + route.path}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem
                    className="fullListItem"
                    key={route.name}
                    disablePadding
                  >
                    <ListItemButton className="listItem">
                      <ListItemIcon
                        className="M-icon"
                        activeClassName="active-nav-item"
                      >
                        <img
                          src={route.icon}
                          className="icon"
                          id="icon"
                          alt=""
                        />
                      </ListItemIcon>
                      <ListItemText className="listItem" primary={route.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                // eslint-disable-next-line indent
              ))
            : adminRoutes.map((route) => (
                // eslint-disable-next-line react/jsx-indent
                <Link
                  to={route.layout + route.path}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem
                    className="fullListItem"
                    key={route.name}
                    disablePadding
                  >
                    <ListItemButton className="listItem">
                      <ListItemIcon
                        className="M-icon"
                        activeClassName="active-nav-item"
                      >
                        <img
                          src={route.icon}
                          className="icon"
                          id="icon"
                          alt=""
                        />
                      </ListItemIcon>
                      <ListItemText className="listItem" primary={route.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
                // eslint-disable-next-line indent
              ))}
        </List>
        <div className="profileDiv">
          <p className="sidebarTxt">Profile</p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '7%' }}>
              <img src={profileDummy} style={{ width: '100%' }} alt="" />
            </div>
            <div>
              <h3 className="name">Farhan Shakir</h3>
              <p className="sidebarTxt">farhan@aquarium.com</p>
            </div>
          </div>
          <div>
            <Button
              fullWidth
              variant="contained"
              className="logoutBtn"
              onClick={handleLogout}
            >
              <img src={logout} style={{ marginRight: '4%' }} alt="" />
              Log out
            </Button>
          </div>
        </div>
        <Toolbar />
      </Drawer>
    </Box>
  );
}
