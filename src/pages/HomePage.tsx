import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, backgroundColor: '#f0f0f0', padding: 2 }}>
        {/* Conteúdo do sidebar */}
        <Typography variant="h6" component="h2" gutterBottom>
          Sidebar
        </Typography>
        {/* Adicione mais componentes do sidebar aqui */}
      </Box>

      {/* Conteúdo principal */}
      <Box sx={{ flex: 1, padding: 2 }}>
        {/* Visão geral dos gastos */}
        <Typography variant="h4" component="h1" gutterBottom>
          Visão geral dos gastos
        </Typography>
        {/* Adicione os componentes da visão geral dos gastos aqui */}
      </Box>
    </Box>
  );
};

export default HomePage;
