import { Grid, Button } from '@mui/material';
import React from 'react';
import { Vehicle } from '../../types/common';
import { formatLicensePlate, formatRenavam } from '../../utils/mask-formatter';
import SelectWithLabel from '../Form/SelectWithLabel';
import { getColors, getYears } from '../../services/apiService';
import TextFieldWithLabel from '../Form/TextFieldWithLabel';

interface VehicleFormProps {
  formData: Vehicle;
  onFormChange: (name: string, value: any) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ formData, onFormChange, onSubmit }) => {
  const handleRenavamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatRenavam(event.target.value);
    onFormChange('renavam', formattedValue);
  };

  const handleLicensePlateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatLicensePlate(event.target.value);
    onFormChange('licensePlate', formattedValue);
  };
  
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextFieldWithLabel
            name="title"
            label="Título"
            value={formData.title}
            onChange={event => onFormChange('title', event.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextFieldWithLabel
            name="brand"
            label="Marca"
            value={formData.brand}
            onChange={event => onFormChange('brand', event.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextFieldWithLabel
            name="vehicleModel"
            label="Modelo"
            value={formData.vehicleModel}
            onChange={event => onFormChange('vehicleModel', event.target.value)}
            required            
          />
        </Grid>

        <Grid item xs={12} md={6}>

          <SelectWithLabel
            name="year"
            label="Ano"
            options={getYears()}
            value={formData.year.toString()}
            onChange={event => onFormChange('year', event.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectWithLabel
            name="color"
            label="Cor"
            options={getColors()}
            value={formData.color || ''}
            onChange={event => onFormChange('color', event.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextFieldWithLabel
            name="price"
            label="Preço (em reais)"
            type="number"
            value={formData.price}
            onChange={event => onFormChange('price', event.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
        <Grid item xs={12} md={6}>
          <TextFieldWithLabel
            name="licensePlate"
            label="Placa"
            value={formData.licensePlate}
            onChange={handleLicensePlateChange}
            inputProps={{ maxLength: 8 }}
            required
          />
        </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextFieldWithLabel
            name="renavam"
            label="RENAVAM"
            value={formData.renavam}
            onChange={handleRenavamChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Registrar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default VehicleForm;
