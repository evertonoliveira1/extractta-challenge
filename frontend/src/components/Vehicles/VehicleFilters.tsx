import React from 'react';
import { Grid, Button, SelectChangeEvent } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import TextFieldWithLabel from '../Form/TextFieldWithLabel';
import SelectWithLabel from '../Form/SelectWithLabel';
import { getColors, getYears } from '../../services/apiService';
import { VehicleFilter } from '../../types/common';

interface VehicleFiltersProps {
  filters: VehicleFilter;
  modelOptions: { value: string; label: string }[];
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => void;
  onSearch: () => void;
  onClearFilters: () => void;
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  filters,
  modelOptions,
  onFilterChange,
  onSearch,
  onClearFilters
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2}>
        <TextFieldWithLabel
          name="title"
          label="Título"
          value={filters.title || ''}
          onChange={onFilterChange}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <TextFieldWithLabel
          name="brand"
          label="Marca"
          value={filters.brand || ''}
          onChange={onFilterChange}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <SelectWithLabel
          name="vehicleModel"
          label="Modelo"
          options={modelOptions}
          value={filters.vehicleModel || ''}
          onChange={onFilterChange}
          required
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <SelectWithLabel
          name="year"
          label="Ano"
          options={getYears()}
          value={filters.year || ''}
          onChange={onFilterChange}
          required
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <SelectWithLabel
          name="color"
          label="Cor"
          options={getColors()}
          value={filters.color || ''}
          onChange={onFilterChange}
          required
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <TextFieldWithLabel
          name="priceMin"
          label="Preço Mínimo"
          type="number"
          value={filters.minPrice || ''}
          onChange={onFilterChange}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <TextFieldWithLabel
          name="priceMax"
          label="Preço Máximo"
          type="number"
          value={filters.maxPrice || ''}
          onChange={onFilterChange}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <TextFieldWithLabel
          name="licensePlate"
          label="Placa"
          value={filters.licensePlate || ''}
          onChange={onFilterChange}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <TextFieldWithLabel
          name="renavam"
          label="Renavam"
          value={filters.renavam || ''}
          onChange={onFilterChange}
        />
      </Grid>

      <Grid item xs={12} md={6} container alignItems="flex-end">
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={onSearch}
          sx={{ marginRight: 1 }}
        >
          Buscar
        </Button>
        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={onClearFilters}
        >
          Limpar
        </Button>
      </Grid>
    </Grid>
  );
};

export default VehicleFilters;
