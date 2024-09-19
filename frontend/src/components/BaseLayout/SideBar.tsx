import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/logout');
  };

  const isActive = (path: string) => location.pathname === path;

  const drawerStyle = {
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: drawerWidth,
      marginTop: '64px',
      boxSizing: 'border-box',
      backgroundColor: '#fafafa',
      color: '#333',
      borderRight: '1px solid #ddd',
      '& .MuiListItemButton-root': {
        '&.Mui-selected': {
          backgroundColor: '#e0e0e0',
          '&:hover': {
            backgroundColor: '#d5d5d5',
          },
        },
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      },
    },
  };

  return (
    <Drawer
      variant="permanent"
      sx={drawerStyle}
    >
      <List>
        <ListItemButton component={Link} to="/" selected={isActive('/')} sx={{ borderRadius: 1 }}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/vehicles/new" sx={{ pl: 4, borderRadius: 1 }}>
            <ListItemText primary="Cadastrar automóvel" />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 1 }} />
        
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 1 }}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
