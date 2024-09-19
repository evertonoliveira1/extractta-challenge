import React, { useState, useEffect } from 'react';
import { Container, SelectChangeEvent, Typography } from '@mui/material';
import { Vehicle, VehicleFilter } from '../../types/common';
import { fetchVehicles, deleteVehicle } from '../../services/apiService';
import VehicleTable from '../../components/Vehicles/VehicleTable';
import VehicleFilters from '../../components/Vehicles/VehicleFilters';
import CustomSnackbar from '../../components/Snackbar/CustomSnackBar';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const VehicleListPage: React.FC = () => {
  const [filters, setFilters] = useState<VehicleFilter>({});
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
  const [modelOptions, setModelOptions] = useState<{ value: string; label: string }[]>([]);

  const navigate = useNavigate();

  const loadData = async (filter: VehicleFilter, page: number, limit: number) => {
    try {
      setIsLoading(true);
      const { data, total } = await fetchVehicles(filter, page + 1, limit);
      setVehicles(data);
      setTotal(total);

      const models = [...new Set(
        data.map(({ vehicleModel }) => ({
          label: vehicleModel,
          value: vehicleModel
        })))
      ];

      setModelOptions(models);

    } catch (error) {
      setSnackbarMessage(`Erro ao buscar automóveis: ${error}`);
      setSnackbarType('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(filters, page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    setPage(0);
    loadData(filters, 0, rowsPerPage);
  };

  const handleClearFilters = () => {
    setFilters({});
    loadData({}, 0, rowsPerPage);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (vehicle: Vehicle) => {
    navigate(`/edit/${vehicle._id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVehicle(id);
      loadData(filters, page, rowsPerPage);
      setSnackbarMessage('Automóvel removido com sucesso!');
      setSnackbarType('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(`Erro ao buscar automóveis: ${error}`);
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {!isLoading && <Container>

        <Typography variant="h6" align='center' margin={2}>
          Listagem de Automóveis
        </Typography>

        <VehicleFilters
          filters={filters}
          modelOptions={modelOptions}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
        />

        <VehicleTable
          vehicles={vehicles}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CustomSnackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          type={snackbarType}
        />

      </Container>}
    </>
  );
};

export default VehicleListPage;
