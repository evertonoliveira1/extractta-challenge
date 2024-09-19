import { Box, Button } from '@mui/material';
import React from 'react';

interface FormButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
}

const FormButton: React.FC<FormButtonProps> = ({ label, type = 'button' }) => (
  <Box sx={{ mt: 2, textAlign: 'center' }}>
    <Button type={type} variant="contained" color="primary">
      {label}
    </Button>
  </Box>
);

export default FormButton;
