import { Link, Paper, Typography } from "@mui/material";
import { IExpenseDTO } from "../../dto/Expense.dto";

const ExpenseTotal: React.FC<{ expenses: IExpenseDTO[] }> = ({ expenses }) => {

  const totalExpenses = () => {
    const currentMonth = new Date().getMonth();

    const expensesInCurrentMonth = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth;
    });

    const total = expensesInCurrentMonth.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0);

    return total;
  };

  const currentMonth = new Date().toLocaleString('default', { month: 'long' }); // Obtém o nome do mês atual
  const total = totalExpenses();

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Gastos
      </Typography>
      <Typography component="p" variant="h4">
        {`R$${total.toFixed(2)}`} {/* Exibe o total formatado como moeda */}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        no mês de {currentMonth}
      </Typography>
      <div>
        <Link color="primary" href="#">
          Ver balanço completo
        </Link>
      </div>
    </Paper>
  )
}

export default ExpenseTotal;
