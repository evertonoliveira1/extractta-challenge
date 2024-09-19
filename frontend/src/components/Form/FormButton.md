# FormButton Component

## Descrição

O componente `FormButton` é um botão de formulário estilizado que exibe um texto fornecido através da prop `label`. Ele é projetado para ser usado como um botão de envio em formulários, com uma aparência consistente e centralizada.

## Props

### `label`

- **Tipo**: `string`
- **Descrição**: O texto que será exibido no botão. Este texto indica a ação que o botão executará quando clicado.
- **Exemplo**: `"Enviar"` 

## Exemplo de Uso

```jsx
import React from 'react';
import FormButton from './FormButton';
import { Box, TextField } from '@mui/material';

const ExampleForm = () => (
  <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
    <TextField
      label="Nome"
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
    />
    <TextField
      label="Email"
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
    />
    <FormButton label="Enviar" />
  </Box>
);

export default ExampleForm;
