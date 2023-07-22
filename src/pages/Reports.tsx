import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box } from '@mui/material';

const Reports: React.FC = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <div>Reports</div>
      </Box>
    );
}

export default Reports;