# LoginPage Component

## Descrição

O componente `LoginPage` exibe uma página de login com campos para nome de usuário e senha. Inclui um botão para alternar a visibilidade da senha e um botão de login. Após o login bem-sucedido, o usuário é redirecionado para a página inicial.

## Exemplo de Uso

```jsx
import React from 'react';
import LoginPage from './LoginPage';

const App = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default App;
