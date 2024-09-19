# LoadingSpinner Component

## Descrição

O componente `LoadingSpinner` exibe um indicador de vehicleregamento centrado na tela. Ele utiliza o `CircularProgress` do Material-UI para mostrar uma animação de vehicleregamento e exibe uma mensagem "Carregando..." abaixo do ícone.

## Exemplo de Uso

```jsx
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const MyComponent = () => (
  <div>
    {/* Exemplo de uso do LoadingSpinner */}
    <LoadingSpinner />
  </div>
);

export default MyComponent;
