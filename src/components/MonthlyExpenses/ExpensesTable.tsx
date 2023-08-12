import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IExpenseDTO } from '../../dto/Expense.dto';
import { IExpensesFormPropsDTO } from '../../dto/ExpensesFormProps.dto';
import { getMonthlyExpenses } from '../../api/getMonthlyExpenses';

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

const ExpensesTable: React.FC<IExpensesFormPropsDTO> = ({ user }) => {
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<IExpenseDTO[]>([]);
  const [loading, setLoading] = React.useState(true);

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
  }, [user]); 

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
  );
};

export default ExpensesTable;
