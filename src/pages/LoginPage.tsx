import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { styled, useTheme } from '@mui/system';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const handleLogin = () => {
    // Lógica de autenticação
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
      <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box sx={{ width: 300 }}>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <StyledButton variant="contained" fullWidth onClick={handleLogin}>
          Login
        </StyledButton>
      </Box>
    </Box>
  );
};

export default LoginPage;
