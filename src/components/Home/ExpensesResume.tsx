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
          {expenses.slice(0, renderedExpenses).map((expense: { date: string | number | Date; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; amount: number; tags: any[]; }, index: React.Key | null | undefined) => (
            <TableRow key={index}>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{`R$ ${expense.amount.toFixed(2)}`}</TableCell>
              <TableCell>{expense.tags.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {renderedExpenses < expenses.length && (
        <Link color="primary" href="/gastos-mensais" sx={{ mt: 3 }}>
          Ver mais despesas
        </Link>
      )}
    </React.Fragment>
  );
};

export default ExpensesResume;
