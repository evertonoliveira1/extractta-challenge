import { Box, CircularProgress, Typography } from '@mui/material';

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        color: '#000',
        position: 'absolute',
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: '#ff3d00',
        }}
      />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
      Carregando...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
