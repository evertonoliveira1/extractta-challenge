import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CustomSnackbar from '../../components/Snackbar/CustomSnackBar';
import { Vehicle } from '../../types/common';
import { createVehicle, fetchVehicle, updateVehicle } from '../../services/apiService';
import VehicleForm from '../../components/Vehicles/VehicleForm';
import { AxiosError } from 'axios';

const VehicleFormPage: React.FC = () => {
  const [formData, setFormData] = useState<Vehicle>({
    title: '',
    brand: '',
    vehicleModel: '',
    year: 0,
    price: 0,
    licensePlate: '',
    color: '',
    renavam: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        try {
          const data = await fetchVehicle(id);
          setFormData(data);
        } catch (error) {
          setSnackbarMessage(`Erro ao carregar os dados dos automóveis: ${error}`);
          setSnackbarType('error');
          setSnackbarOpen(true);
        }
      };

      loadData();
    }
  }, [id]);

  const handleFormChange = (name: string, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await updateVehicle(id, formData);
        setSnackbarMessage('Automóvel atualizado com sucesso! Você será redirecionado para a home.');
      } else {
        await createVehicle(formData);
        setSnackbarMessage('Automóvel registrado com sucesso! Você será redirecionado para a home.');
      }
      setSnackbarType('success');
      setSnackbarOpen(true);

      setTimeout(() => navigate('/vehicles'), 1000 * 5);      
    } catch (error) {
      let message = '';
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message;
        const errors = Array.isArray(errorMessage) ? errorMessage.join(',') : errorMessage;
        message = `Erro ao salvar o automóvel: ${errors}`;
      } else {
        message = `Erro ao salvar o automóvel: ${error}`;
      }
      setSnackbarMessage(message);
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h5" component="h5" align="center" gutterBottom>
          {id ? 'Editar Automóvel' : 'Registro de Automóvel'}
        </Typography>

        <Paper sx={{ p: 2, mb: 1, border: '1px solid #ccc', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
          <VehicleForm
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
          />
        </Paper>

        <CustomSnackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          type={snackbarType}
        />
      </Box>
    </>
  );
};

export default VehicleFormPage;
