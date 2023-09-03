import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Configuration from '../components/Config/Configuration';
import { Box } from '@mui/material';

const Config: React.FC = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Configuration />
      </Box>
    );
}

export default Config;