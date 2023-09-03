import React, { useContext, useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { styled, useTheme } from '@mui/system';
import { AuthContext } from '../contexts/AuthProvider';
import Copyright from '../components/Copyright/Index';

const LoginPage: React.FC<{ isLoggedIn: boolean; setIsLoggedIn: (value: boolean) => void }> = ({ isLoggedIn, setIsLoggedIn }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLoginClick = async () => {
    const userData = await login(email, password);
    if (!userData) {
      alert('Email or password incorrect!');
      return false;
    }
    setIsLoggedIn(true);
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
        <StyledButton variant="contained" fullWidth onClick={handleLoginClick}>
          Login <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.contrastText }} />
        </StyledButton>
      </Box>
      <Copyright />
    </Box>
  );
};

export default LoginPage;
