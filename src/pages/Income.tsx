import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box } from '@mui/material';

const Income: React.FC = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <div>Income</div>
      </Box>
    );
}

export default Income;