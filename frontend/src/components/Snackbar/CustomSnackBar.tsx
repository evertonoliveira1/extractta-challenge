import { Snackbar, Alert } from '@mui/material';

import React from 'react';

type SnackbarType = 'success' | 'error';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  type?: SnackbarType;
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, message, type = 'success', onClose }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
