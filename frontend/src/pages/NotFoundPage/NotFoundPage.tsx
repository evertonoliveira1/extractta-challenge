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