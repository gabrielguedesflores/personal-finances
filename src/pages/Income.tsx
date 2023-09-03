import * as React from 'react';
import Lottie from 'lottie-react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import animationData from '../assets/animations/build.json';
import Copyright from '../components/Copyright/Index';

const Income: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Receitas em Construção
              </Typography>
              <Lottie
                animationData={animationData}
                style={{ width: '300px', height: '300px', margin: '20px auto' }}
              />
            </Paper>
          </Grid>
        </Grid>

        <Copyright />
      </Container>
    </Box>
  );
}

export default Income;
