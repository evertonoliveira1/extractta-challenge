import { Box, CssBaseline } from '@mui/material';
import React from 'react';

import AppBar from './AppBar';
import Sidebar from './SideBar';

const BaseLayout = ({ children }: { children: React.ReactNode }) => { 

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: '64px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseLayout;
