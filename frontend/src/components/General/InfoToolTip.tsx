import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

interface InfoTooltipProps {
  title: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton sx={{ color: 'gold' }}> 
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InfoTooltip;
