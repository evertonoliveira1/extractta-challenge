# CustomSnackbar Component

## Descrição

O componente `CustomSnackbar` exibe uma notificação (snackbar) com uma mensagem de feedback para o usuário. Ele utiliza o Material-UI para exibir alertas temporários que podem ser de diferentes tipos, como sucesso ou erro.

## Props

### `open`

- **Tipo**: `boolean`
- **Descrição**: Indica se o snackbar deve ser exibido ou não.
- **Exemplo**: `true`

### `message`

- **Tipo**: `string`
- **Descrição**: A mensagem que será exibida no snackbar.
- **Exemplo**: `"Operação realizada com sucesso!"`

### `type`

- **Tipo**: `SnackbarType`
- **Descrição**: O tipo de alerta a ser exibido. Pode ser `"success"` ou `"error"`. O padrão é `"success"`.
- **Exemplo**: `"error"`

### `onClose`

- **Tipo**: `() => void`
- **Descrição**: Função chamada quando o snackbar deve ser fechado. Geralmente usada para atualizar o estado que controla a visibilidade do snackbar.
- **Exemplo**:
  ```jsx
  const handleClose = () => {
    setOpen(false);
  };

# Exemplo de Uso

```jsx
import React, { useState } from 'react';
import CustomSnackbar from './CustomSnackbar';
import Button from '@mui/material/Button';

const ExampleComponent = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('Mensagem padrão');

  const handleOpenSnackbar = (type: 'success' | 'error', message: string) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <div>
      <Button onClick={() => handleOpenSnackbar('success', 'Operação realizada com sucesso!')}>Mostrar Sucesso</Button>
      <Button onClick={() => handleOpenSnackbar('error', 'Houve um erro ao realizar a operação.')}>Mostrar Erro</Button>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default ExampleComponent;
