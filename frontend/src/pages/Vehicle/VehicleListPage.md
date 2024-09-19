# VehicleListPage Component

O componente `VehicleListPage` é responsável por exibir uma lista de veículos com suporte para filtragem, paginação e operações CRUD (criação, leitura, atualização e exclusão). Ele inclui funcionalidades para buscar, exibir e gerenciar veículos.

## Funcionalidade

1. **Carregamento de Dados**
   - **`loadData`:** Busca os veículos da API com base nos filtros aplicados, na página atual e no número de linhas por página. Atualiza a lista de veículos, o total de veículos e as opções de modelos disponíveis para filtragem.

2. **Gerenciamento de Estado**
   - **`filters`:** Armazena os filtros aplicados à busca de veículos.
   - **`vehicles`:** Armazena a lista de veículos retornada pela API.
   - **`isLoading`:** Indica se os dados estão sendo carregados.
   - **`page` e `rowsPerPage`:** Controlam a paginação dos resultados.
   - **`total`:** Total de veículos disponíveis, usado para a paginação.
   - **`snackbarOpen`, `snackbarMessage`, `snackbarType`:** Controlam e exibem mensagens de feedback ao usuário.
   - **`modelOptions`:** Armazena as opções de modelos de veículos para filtragem.

3. **Manipulação de Filtros e Pesquisa**
   - **`handleFilterChange`:** Atualiza o estado dos filtros com base nas alterações dos campos de entrada.
   - **`handleSearch`:** Recarrega os dados com os filtros aplicados.
   - **`handleClearFilters`:** Limpa os filtros e recarrega a lista de veículos.

4. **Manipulação de Paginação**
   - **`handleChangePage`:** Atualiza a página atual e recarrega os dados.
   - **`handleChangeRowsPerPage`:** Atualiza o número de linhas por página e recarrega os dados.

5. **Operações CRUD**
   - **`handleEdit`:** Navega para a página de edição de um veículo.
   - **`handleDelete`:** Remove um veículo da lista e recarrega os dados.

## Componentes

- **`Container`:** Fornece um contêiner centralizado para o conteúdo.
- **`Typography`:** Renderiza o título da página.
- **`VehicleFilters`:** Componente para exibir e gerenciar filtros de pesquisa.
- **`VehicleTable`:** Componente para exibir a lista de veículos em uma tabela com suporte para edição e exclusão.
- **`CustomSnackbar`:** Exibe mensagens de feedback para o usuário.
- **`LoadingSpinner`:** Exibe um indicador de carregamento enquanto os dados estão sendo buscados.

## Código

```jsx
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
