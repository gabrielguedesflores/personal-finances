import React from 'react';
import { Box, Typography, Divider, Paper, Link, Container, Grid } from '@mui/material';
import ExpensesResume from '../Home/ExpensesResume';
import Chart from '../Home/Chart';
import Copyright from '../Copyright/Index';

const PanelGeneral: React.FC = () => {
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
            <Chart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
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
              $3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              on 15 March, 2019
            </Typography>
            <div>
              <Link color="primary" href="#">
                View balance
              </Link>
            </div>
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ExpensesResume />
          </Paper>
        </Grid>
      </Grid>
      
      <Copyright />
    </Container>
  );
};

export default PanelGeneral;
