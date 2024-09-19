import {
    TablePagination,
  } from '@mui/material';
  import React from 'react';
  
  interface PaginationProps {
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    count,
    rowsPerPage,
    page,
    onPageChange,
    onRowsPerPageChange
  }) => (
    <TablePagination
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage='Itens por página'
    />
  );
  
  export default Pagination;
  