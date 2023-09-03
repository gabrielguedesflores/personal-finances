import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import PanelGeneral from '../components/PanelGeneral/PanelGeneral';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <PanelGeneral />
    </Box>
  );
};

export default HomePage;
