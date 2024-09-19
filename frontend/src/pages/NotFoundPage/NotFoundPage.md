# NotFoundPage Component

O componente `NotFoundPage` é uma página de erro que é exibida quando o usuário tenta acessar uma página que não existe. Ele fornece uma mensagem amigável para informar ao usuário que a página não foi encontrada e oferece uma opção para retornar à página inicial.

## Funcionalidade

1. **Navegação**
   - **`handleGoHome`:** Função que redireciona o usuário para a página inicial quando o botão "Que tal voltar para a Tela principal?" é clicado.

2. **Exibição de Mensagens e Imagem**
   - Exibe uma imagem que indica um erro de "Página não encontrada".
   - Mostra uma mensagem de erro em formato de título (`h4`) e uma descrição adicional em formato de texto (`body1`).
   - Oferece um botão para redirecionar o usuário de volta à página inicial.

## Componentes

- **`Container`:** Utilizado para centralizar o conteúdo com um máximo de largura definido.
- **`Box`:** Usado para exibir a imagem e o conteúdo de forma centralizada e vertical.
- **`Typography`:** Renderiza o título e a descrição da página.
- **`Button`:** Oferece um botão estilizado que redireciona o usuário para a página inicial.
- **`img`:** Exibe a imagem de erro "Not Found".

## Código

```jsx
import { Container, Typography, Button, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import notFoundImage from '../../assets/not_found.png'; 

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={notFoundImage} alt="Not Found" style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }} />
                <Typography variant="h4" gutterBottom>
                    Oops! A página que você está procurando não existe.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Desculpe, a página que você está procurando não existe ou foi removida.
                </Typography>
                <Button variant="contained" color="primary" onClick={handleGoHome}>
                    Que tal voltar para a Tela principal?
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
