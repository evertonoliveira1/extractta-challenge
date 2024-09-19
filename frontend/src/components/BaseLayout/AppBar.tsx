import { AppBar as MuiAppBar, 
  Toolbar, 
  Typography, 
  IconButton 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppBar: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <MuiAppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Desafio Extractta - Catálogo de automóveis
          </Typography>

          <IconButton color="inherit" onClick={handleProfileClick} sx={{ marginRight: 2 }}>
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
     
    </>
  );
};

export default AppBar;
