import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box } from '@mui/material';

const Config: React.FC = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <div>Config</div>
      </Box>
    );
}

export default Config;