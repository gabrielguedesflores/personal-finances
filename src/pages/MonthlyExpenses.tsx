import * as React from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import Sidebar from '../components/Sidebar/Sidebar';
import { getMonthlyExpenses } from '../api/getMonthlyExpenses';
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
import { IExpenseDTO } from '../dto/Expense.dto';


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
  const { user } = React.useContext(AuthContext);
  const [selectedMonth, setSelectedMonth] = React.useState<Date | null>();
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<IExpenseDTO[]>([]);
  const [amountInputValue, setAmountInputValue] = React.useState<number>(0);
  const [expenseName, setExpenseName] = React.useState<string>('Despesa');
  const nextIdRef = React.useRef(1);
  const [loading, setLoading] = React.useState(true); // Adicionando a variável loading

  React.useEffect(() => {
    if (user) {
      const fetchMonthlyExpenses = async () => {
        const expenses = await getMonthlyExpenses(user.userId);
        console.log(expenses);
        setMonthlyExpenses(expenses);
        setLoading(false); // Definindo loading como falso após buscar as despesas
      };
      fetchMonthlyExpenses();
    }
  }, [user]); // Atenção ao passar "user" como dependência

  const handleAddExpense = () => {
    if (amountInputValue <= 0 || !selectedMonth || !expenseName) {
      alert('Preencha todos os campos');
      return;
    }

    const newExpense: IExpenseDTO = {
      expenseId: 'new-expense-' + nextIdRef.current,
      userId: user!.userId,
      description: expenseName,
      amount: amountInputValue,
      date: selectedMonth!.toISOString(),
      tags: [],
    };

    setMonthlyExpenses([...monthlyExpenses, newExpense]);
    setAmountInputValue(0);
    setExpenseName('');
    nextIdRef.current += 1;
  };

  const handleEditExpense = (index: number, newValue: number) => {
    const updatedExpenses = [...monthlyExpenses];
    updatedExpenses[index].amount = newValue;
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
              label="Descrição"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
            <TextField
              label="Valor"
              type="number"
              value={amountInputValue}
              onChange={(e) => setAmountInputValue(Number(e.target.value))}
            />
            <DatePicker label="Mês/Ano" views={['month', 'year']} value={selectedMonth} onChange={setSelectedMonth} />
            <Button variant="contained" onClick={handleAddExpense}>
              Adicionar
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            {loading ? (
              <Typography variant="body1">Carregando...</Typography>
            ) : monthlyExpenses.length > 0 ? (

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
                          {expense.description}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {expense.amount ? `R$ ${expense.amount.toFixed(2)}` : ''}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {new Date(expense.date).toLocaleDateString('pt-BR', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Button variant="outlined" onClick={() => handleEditExpense(index, expense.amount)}>
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
            ) : (
              <Typography variant="body1">Nenhuma despesa encontrada.</Typography>
            )}

          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthlyExpenses;
