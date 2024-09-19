import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Box
} from '@mui/material';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import image from '../../assets/background.png';
import { fetchUserProfile } from '../../services/apiService';
import instance from '../../services/axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await instance.post('/auth/login', { username, password });
      localStorage.setItem('access_token', response.data.access_token);

      const user = await fetchUserProfile();
      localStorage.setItem('userId', user._id);
      navigate('/');
    } catch (error) {
      console.error('error', error);
      setError('Login ou senha inválidos');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', padding: 0, margin: 0 }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            height: '100%',
            background: `url(${image}) no-repeat center center`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        />
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ maxWidth: 400, width: '100%' }}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <TextField
              fullWidth
              label="Usuário"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            <Button
              id="btn-login"
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 2, width: '100%' }}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
