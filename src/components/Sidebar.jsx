import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import admin from '../assets/images/admin.svg';
import logo from '../assets/images/blueLogo.svg';
import service from '../assets/images/service.svg';
import logout from '../assets/images/Logout.svg';
import profileDummy from '../assets/images/profileDummy.svg';

const drawerWidth = 300;

export default function Sidebar() {
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
        <img src={logo} style={{ margin: '16% auto', width: '70%', marginTop: '11%' }} alt="" />
        {/* <Divider /> */}

        <List>
          <p className="sidebarTxt">Menu</p>
          {['Admin', 'Service'].map((text, index) => (
            <ListItem className="fullListItem" key={text} disablePadding>
              <ListItemButton className="listItem">
                <ListItemIcon className="M-icon" activeClassName="active-nav-item">
                  {index % 2 === 0 ? (
                    <img src={admin} className="icon" id="icon" alt="" />
                  ) : (
                    <img src={service} className="icon" alt="" />
                  )}
                </ListItemIcon>
                <ListItemText className="listItem" primary={text} />
              </ListItemButton>
            </ListItem>
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
            <Button fullWidth variant="contained" className="logoutBtn">
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
