import React from 'react';
import { Box, Typography, Divider, Paper, Link, Container, Grid } from '@mui/material';
import Chart from '../Home/Chart';
import ExpenseTotal from '../Home/ExpenseTotal';
import ExpensesResume from '../Home/ExpensesResume';
import Copyright from '../Copyright/Index';
import { AuthContext } from '../../contexts/AuthProvider';
import { getExpenses } from '../../api/fetchExpenses';
import { IExpenseDTO } from '../../dto/Expense.dto';
import BarsDataset from '../Home/BarChart';

const PanelGeneral: React.FC = () => {
  const [expenses, setExpenses] = React.useState<IExpenseDTO[]>([]);
  const { user } = React.useContext(AuthContext);
  
  React.useEffect(() => {
    const fetchExpenses = async () => {
      try {
        if (user) {
          const response = await getExpenses(user.userId);
          setExpenses(response); // Não é necessário acessar .data, pois você já fez isso na API
        }
      } catch (error) {
        console.error('Error fetching monthly expenses:', error);
        setExpenses([]);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart expenses={expenses} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <ExpenseTotal expenses={expenses}/>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ExpensesResume expenses={expenses} />
          </Paper>
        </Grid>

        <Grid item xs={6} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <BarsDataset  />
          </Paper>
        </Grid>
      </Grid>
      
      <Copyright />
    </Container>
  );
};

export default PanelGeneral;
