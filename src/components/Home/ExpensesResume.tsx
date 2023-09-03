import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { IExpenseDTO } from '../../dto/Expense.dto';

const ExpensesResume: React.FC<{ expenses: IExpenseDTO[] }> = ({ expenses }) => {
  const [renderedExpenses, setRenderedExpenses] = React.useState(5);

  // Função para verificar se uma data está no mês atual
  const isDateInCurrentMonth = (dateString: string) => {
    const currentDate = new Date();
    const expenseDate = new Date(dateString);
    return currentDate.getMonth() === expenseDate.getMonth() && currentDate.getFullYear() === expenseDate.getFullYear();
  };

  // Filtra as despesas para manter apenas as do mês atual
  const expensesForCurrentMonth = expenses.filter((expense) => isDateInCurrentMonth(expense.date));

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Gastos Mensais
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expensesForCurrentMonth.slice(0, renderedExpenses).map((expense, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{`R$ ${expense.amount.toFixed(2)}`}</TableCell>
              <TableCell>{expense.tags.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/gastos-mensais" sx={{ mt: 3 }}>
        Ver mais despesas
      </Link>
    </React.Fragment>
  );
};

export default ExpensesResume;
