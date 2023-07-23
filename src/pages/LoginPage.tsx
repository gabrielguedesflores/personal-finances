import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { styled, useTheme } from '@mui/system';

const LoginPage: React.FC<{ isLoggedIn: boolean; setIsLoggedIn: (value: boolean) => void }> = ({ isLoggedIn, setIsLoggedIn }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de autenticação
    // if (email.trim() === '' || password.trim() === '') {
    //   alert('Por favor, preencha todos os campos.');
    //   return;
    // }
    // Lógica de autenticação bem-sucedida
    setIsLoggedIn(true);
    setUserId(1);
    navigate('/home', { state: { userId: 1 } });
  };

  const StyledButton = styled(Button)(() => ({
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#444654',
    },
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box sx={{ width: 300 }}>
        <TextField 
          label="Email" 
          fullWidth margin="normal" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton variant="contained" fullWidth onClick={handleLogin}>
          Login <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.contrastText }} />
        </StyledButton>
      </Box>
    </Box>
  );
};

export default LoginPage;
