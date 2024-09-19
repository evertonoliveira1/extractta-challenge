# VehicleFormPage Component

O componente `VehicleFormPage` é responsável por criar e atualizar registros de veículos. Ele inclui funcionalidades como recuperação de dados, manipulação de formulários e notificações para o usuário.

## Funcionalidade

1. **Recuperação de Dados**
   - Se um `id` está presente nos parâmetros da URL, ele recupera os dados do veículo usando `fetchVehicle` e preenche o formulário.
   - Se não houver `id`, inicializa um formulário vazio para criar um novo veículo.

2. **Manipulação de Formulários**
   - **`handleFormChange`:** Atualiza o estado do formulário sempre que o usuário faz alterações.
   - **`handleSubmit`:** Submete os dados do formulário. Dependendo da presença de um `id`, cria um novo veículo ou atualiza um existente. Manipula notificações de sucesso e erro.

3. **Notificações**
   - **`CustomSnackbar`:** Exibe mensagens de sucesso ou erro com base no resultado da submissão do formulário.

## Componentes

- **`Box`:** Fornece layout e espaçamento para o contêiner do formulário.
- **`Typography`:** Renderiza um título para o formulário.
- **`Paper`:** Envolve o componente `VehicleForm` em um contêiner estilizado com padding e borda.
- **`VehicleForm`:** Componente para renderizar campos do formulário e manipular a submissão do formulário.
- **`CustomSnackbar`:** Exibe mensagens de feedback para o usuário.

## Código

```jsx
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
