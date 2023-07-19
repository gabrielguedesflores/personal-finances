import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

const PanelGeneral: React.FC = () => {
  return (
    <Box sx={{ flex: 1, padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Visão geral dos gastos
      </Typography>
      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2, mt: 2, width: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            Saldo Total
          </Typography>
          <Typography variant="h6" gutterBottom>
            R$ 10.000,00
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, mt: 2, width: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            Gastos Mensais
          </Typography>
          <Typography variant="h6" gutterBottom>
            R$ 2.500,00
          </Typography>
        </Paper>

        {/* Adicione mais cards de resumo aqui */}
      </Box>
    </Box>
  );
};

export default PanelGeneral;
