import * as React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box, Typography, Divider, TextField, Button, Paper } from '@mui/material';
import { AccountBalanceWallet, AttachMoney, CreditCard, LocalAtm } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const MonthlyExpenses: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = React.useState<Date | null>(null);
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<{ id: number; name: string; value: number; month: Date }[]>([]);
  const [amountInputValue, setAmountInputValue] = React.useState<number>(0);
  const [expenseName, setExpenseName] = React.useState<string>('Despesa');
  const nextIdRef = React.useRef(1);

  const handleAddExpense = () => {
    if (amountInputValue <= 0 || !selectedMonth || !expenseName) {
      alert('Preencha todos os campo');
      return false;
    }

    const newExpense = {
      id: nextIdRef.current,
      name: expenseName,
      value: amountInputValue,
      month: new Date(selectedMonth)
    };

    setMonthlyExpenses([...monthlyExpenses, newExpense]);
    setAmountInputValue(0);
    setExpenseName('');
    nextIdRef.current += 1;
  };

  const handleEditExpense = (index: number, newValue: number) => {
    const updatedExpenses = [...monthlyExpenses];
    updatedExpenses[index].value = newValue;
    setMonthlyExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (index: number) => {
    const updatedExpenses = [...monthlyExpenses];
    updatedExpenses.splice(index, 1);
    setMonthlyExpenses(updatedExpenses);
  };

  const filteredExpenses = monthlyExpenses.filter((expense) => {
    if (selectedMonth) return true;
  });


  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1, padding: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gastos Mensais
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <TextField
              label="Nome do Gasto"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
            <TextField
              label="Valor do Gasto"
              type="number"
              value={amountInputValue}
              onChange={(e) => setAmountInputValue(Number(e.target.value))}
            />
            <DatePicker label={'"Mês" and "Ano"'} views={['month', 'year']} value={selectedMonth} onChange={setSelectedMonth} />
            <Button variant="contained" onClick={handleAddExpense}>
              Adicionar
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <table>
              <thead>
                <tr>
                  <th>Nome do Gasto</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.name}</td>
                    <td>R$ {expense.value.toFixed(2)}</td>
                    <td>
                      <Button variant="outlined" onClick={() => handleEditExpense(index, expense.value)}>
                        Editar
                      </Button>
                      <Button variant="outlined" onClick={() => handleDeleteExpense(index)}>
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );

}

export default MonthlyExpenses;
