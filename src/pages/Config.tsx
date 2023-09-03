import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Configuration from '../components/Config/Configuration';
import { Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthProvider';

const Config: React.FC = () => {
  const { user } = React.useContext(AuthContext);

  if(user) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Configuration user={user} />
      </Box>
    );
  }

  return null;
  
}

export default Config;