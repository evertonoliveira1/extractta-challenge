import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  IconButton,
  Grid,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Vehicle } from '../../types/common';

interface VehicleTableProps {
  vehicles: Vehicle[];
  total: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

interface HeadCell {
  id: keyof Vehicle;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'title', numeric: false, label: 'Título' },
  { id: 'brand', numeric: false, label: 'Marca' },
  { id: 'vehicleModel', numeric: false, label: 'Modelo' },
  { id: 'year', numeric: true, label: 'Ano' },
  { id: 'price', numeric: true, label: 'Preço' },
  { id: 'licensePlate', numeric: false, label: 'Placa' },
  { id: 'color', numeric: false, label: 'Cor' },
  { id: 'renavam', numeric: false, label: 'Renavam' },
];

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  total,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onEdit,
  onDelete,
}) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Vehicle>('title');

  const handleRequestSort = (property: keyof Vehicle) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (!orderBy) return 0;

    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return -1;
    if (bValue === undefined) return 1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, border: '1px solid #ddd' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                sx={{ border: '1px solid #ddd' }}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleRequestSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ border: '1px solid #ddd' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedVehicles.length > 0 ? (
            sortedVehicles.map((vehicle) => (
              <TableRow key={vehicle.licensePlate} hover>
                <TableCell sx={{ border: '1px solid #ddd' }}>{vehicle.title}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{vehicle.brand}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{vehicle.vehicleModel}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }} align="right">
                  {vehicle.year}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }} align="right">
                  {vehicle.price}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{vehicle.licensePlate}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{vehicle.color}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>{vehicle.renavam}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <IconButton onClick={() => onEdit(vehicle)}>
                        <Edit />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <IconButton onClick={() => onDelete(vehicle._id || '')}>
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} sx={{ border: '1px solid #ddd' }}>
                Nenhum automóvel disponível.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={onChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Registros por página"
        onRowsPerPageChange={onChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 50, 100]}
      />
    </TableContainer>
  );
};

export default VehicleTable;
