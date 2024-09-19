import {
    Container,
    Typography,
    Box,
    Avatar,
    Paper,
    Button
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import { UserProfile } from '../../types/common';
import { fetchUserProfile } from '../../services/apiService';

const ProfilePage: React.FC = () => {
    const [userData, setUserData] = useState<UserProfile>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchUserProfile();
                setUserData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Falha ao carregar os dados do perfil do usuário: ${err.message}`);
                } else {
                    setError('Erro desconhecido');
                }
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <LoadingSpinner />
        </Box>
    );

    if (error) return <Typography color="error">{error}</Typography>;

    const initial = userData?.username.charAt(0).toUpperCase();

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
            >
                Voltar
            </Button>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={4}>
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56, mr: 2 }}>
                        {initial}
                    </Avatar>
                    <Typography variant="h6" component="div">
                        {userData?.username}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Email:</Typography>
                    <Typography variant="body1">{userData?.email}</Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Data de criação:</Typography>
                    <Typography variant="body1">{moment(userData?.createdAt).locale('pt-br').format('DD/MM/YYYY')}</Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
