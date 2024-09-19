import React from 'react';
import { Button } from '@mui/material';

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => (
  <Button type="submit" variant="contained" color="primary">
    {label}
  </Button>
);

export default SubmitButton;
