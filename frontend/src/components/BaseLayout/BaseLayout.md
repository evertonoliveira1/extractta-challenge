# BaseLayout Component

## Descrição

O componente `BaseLayout` é um layout base que fornece uma estrutura comum para a aplicação. Ele inclui um `AppBar` no topo e um `Sidebar` na lateral. O conteúdo principal da página é renderizado na área central, e o layout é responsivo com a capacidade de alternar a visibilidade do sidebar.

## Exemplo de Uso

```jsx
import React from 'react';
import BaseLayout from './BaseLayout';

const MainPage = () => (
  <BaseLayout>
    <h1>Bem-vindo à Página Principal!</h1>
    <p>Conteúdo da página vai aqui.</p>
  </BaseLayout>
);

export default MainPage;
