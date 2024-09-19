# LogoutPage Component

## Descrição

O componente `LogoutPage` é responsável por realizar o logout do usuário. Ao montar o componente, ele remove o token de acesso do `localStorage` e redireciona o usuário para a página de login.

## Exemplo de Uso

```jsx
import React from 'react';
import LogoutPage from './LogoutPage';

const App = () => {
  return (
    <div>
      <LogoutPage />
    </div>
  );
};

export default App;
