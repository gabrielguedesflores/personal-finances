import * as React from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Sidebar from '../components/Sidebar/Sidebar';
import { IExpenseDTO } from '../dto/Expense.dto';
import ExpenseTable from '../components/MonthlyExpenses/ExpenseTable';
import Copyright from '../components/Copyright/Index';

const MonthlyExpenses: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1, padding: 2 }} style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
          <ExpenseTable />
          <Copyright />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthlyExpenses;
