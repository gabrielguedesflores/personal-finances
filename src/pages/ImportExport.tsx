import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box } from '@mui/material';

const ImportExport: React.FC = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <div>ImportExport</div>
      </Box>
    );
}

export default ImportExport;