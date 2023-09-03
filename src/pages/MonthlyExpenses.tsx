import * as React from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Sidebar from '../components/Sidebar/Sidebar';
import { IExpenseDTO } from '../dto/Expense.dto';
import ExpenseTable from '../components/MonthlyExpenses/ExpenseTable';

const MonthlyExpenses: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<IExpenseDTO[]>([]);
  const handleExpenseAdded = (newExpense: IExpenseDTO) => {
    setMonthlyExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1, padding: 2 }} style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gastos Mensais
          </Typography>
          {/* <ExpensesForm user={user!} onExpenseAdded={handleExpenseAdded!} /> */}
          {/* <ExpensesTable user={user!} expenseFather={monthlyExpenses!} /> */}
          
          <ExpenseTable />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthlyExpenses;
