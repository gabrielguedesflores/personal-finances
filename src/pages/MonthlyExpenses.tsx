import * as React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box, Typography, Divider, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MonthlyExpenses: React.FC = () => {
  const { userId } = React.useContext(AuthContext);
  const [selectedMonth, setSelectedMonth] = React.useState<Date | null>();
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<{ id: number; name: string; value: number; month: Date }[]>([]);
  const [amountInputValue, setAmountInputValue] = React.useState<number>(0);
  const [expenseName, setExpenseName] = React.useState<string>('Despesa');
  const nextIdRef = React.useRef(1);
  console.log('userId', userId);
  
  const handleAddExpense = () => {
    if (amountInputValue <= 0 || !selectedMonth || !expenseName) {
      alert('Preencha todos os campos');
      return;
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
    return expense;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1, padding: 2 }} style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Descrição</StyledTableCell>
                    <StyledTableCell align="right">Valor</StyledTableCell>
                    <StyledTableCell align="right">Mês/Ano</StyledTableCell>
                    <StyledTableCell align="right">Ações</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody> 
                  {filteredExpenses.map((expense, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {expense.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">R$ {expense.value.toFixed(2)}</StyledTableCell>
                      <StyledTableCell align="right">{expense.month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="outlined" onClick={() => handleEditExpense(index, expense.value)}>
                          Editar
                        </Button>
                        <Button variant="outlined" onClick={() => handleDeleteExpense(index)}>
                          Excluir
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthlyExpenses;
