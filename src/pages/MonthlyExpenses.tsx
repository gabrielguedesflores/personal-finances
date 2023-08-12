import * as React from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Sidebar from '../components/Sidebar/Sidebar';
import ExpensesForm from '../components/MonthlyExpenses/ExpenseForm';
import ExpensesTable from '../components/MonthlyExpenses/ExpensesTable';

const MonthlyExpenses: React.FC = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1, padding: 2 }} style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gastos Mensais
          </Typography>
          <ExpensesForm user={user!} />
          <ExpensesTable user={user!} />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthlyExpenses;
