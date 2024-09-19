import { TextField } from '@mui/material';
import React from 'react';

interface FormFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  required?: boolean;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  value,
  onChange,
  fullWidth = true,
  required = false,
  type = 'text',
}) => (
  <TextField
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    fullWidth={fullWidth}
    required={required}
    variant="outlined"
    sx={{ mb: 2 }}
    type={type}
  />
);

export default FormField;
