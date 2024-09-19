import { TextField, FormControl, Typography, Box } from '@mui/material';
import React from 'react';
import InfoTooltip from '../General/InfoToolTip';

interface TextFieldWithLabelProps {
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  type?: string;
  tooltipDescription?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const TextFieldWithLabel: React.FC<TextFieldWithLabelProps> = ({
  name,
  value,
  onChange,
  label,
  required = false,
  type = 'text',
  tooltipDescription,
  inputProps
}) => (
  <FormControl fullWidth sx={{ mb: 1 }}>
    <Box display="flex" alignItems="center" mb={1}>
      <Typography variant="body2">
        {label}
      </Typography>
      {tooltipDescription && <InfoTooltip title={tooltipDescription} />}
    </Box>
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      required={required}
      variant="outlined"
      type={type}
      inputProps={inputProps}
    />
  </FormControl>
);

export default TextFieldWithLabel;
