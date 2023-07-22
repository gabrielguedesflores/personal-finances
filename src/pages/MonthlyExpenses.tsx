import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, TextField, Button, Paper, TextFieldProps } from '@mui/material';
import { AccountBalanceWallet, AttachMoney, CreditCard, LocalAtm } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';

const MonthlyExpenses: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = React.useState<Date | null>(null);
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<number[]>([]);
  const [amountInputValue, setAmountInputValue] = React.useState<number>(0);

  const handleAddExpense = (amount: number) => {
    setMonthlyExpenses([...monthlyExpenses, amount]);
  };

  const filteredExpenses = monthlyExpenses.filter((expense) => {
    if (!selectedMonth) return true;
    const expenseMonth = new Date(expense).getMonth();
    const selectedMonthValue = selectedMonth.getMonth();
    return expenseMonth === selectedMonthValue;
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gastos Mensais
        </Typography>
        <Divider />
        <DatePicker
          label="Selecione o mês"
          value={selectedMonth}
          onChange={(newValue : Date | null) => setSelectedMonth(newValue)}
          renderInput={(params: TextFieldProps) => <TextField {...params} />}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <TextField
            label="Valor do Gasto"
            type="number"
            value={amountInputValue}
            onChange={(e) => setAmountInputValue(Number(e.target.value))}
          />
          <Button variant="contained" onClick={() => handleAddExpense(amountInputValue)}>
            Adicionar
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          {filteredExpenses.map((expense, index) => (
            <Paper key={index} sx={{ p: 2, mt: 2, width: 300 }}>
              <Typography variant="subtitle1" gutterBottom>
                Gasto #{index + 1}
              </Typography>
              <Typography variant="h6" gutterBottom>
                R$ {expense.toFixed(2)}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default MonthlyExpenses;
