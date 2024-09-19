import { FormControl, MenuItem, Select, Typography, Box, SelectChangeEvent } from '@mui/material';
import React from 'react';
import InfoTooltip from '../General/InfoToolTip';

interface SelectWithLabelProps {
  name: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  label: string;
  required?: boolean;
  tooltipDescription?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  name,
  value,
  onChange,
  label,
  required = false,
  tooltipDescription,
  options,
  disabled
}) => (
  <FormControl fullWidth variant="outlined">
    <Box display="flex" alignItems="center" mb={1}>
      <Typography variant="body2">
        {label}
      </Typography>
      {tooltipDescription && <InfoTooltip title={tooltipDescription} />}
    </Box>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      displayEmpty
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectWithLabel;
