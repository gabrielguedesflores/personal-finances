import React from 'react';
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, MonetizationOn, TrendingUp, ImportExport, Assessment, Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box sx={{
      width: 240,
      backgroundColor: "var(--chatgpt-background-sidebar)",
      padding: 2, height: "100vh",
    }}>
      <img src="/logo.png" alt="Logo" style={{ height: 90, marginRight: 10 }} />     
      <Divider />
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemIcon>
            <Home sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'var(--mui-palette-primary-contrastText)' }} primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/gastos-mensais">
          <ListItemIcon>
            <MonetizationOn sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'var(--mui-palette-primary-contrastText)' }} primary="Gastos Mensais" />
        </ListItem>
        <ListItem button component={Link} to="/receitas">
          <ListItemIcon>
            <TrendingUp sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'var(--mui-palette-primary-contrastText)' }} primary="Receitas" />
        </ListItem>
        <ListItem button component={Link} to="/importar-exportar">
          <ListItemIcon>
            <ImportExport sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'var(--mui-palette-primary-contrastText)' }} primary="Importar/Exportar" />
        </ListItem>
        <ListItem button component={Link} to="/relatorios">
          <ListItemIcon>
            <Assessment sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'var(--mui-palette-primary-contrastText)' }} primary="Relatórios" />
        </ListItem>
        <ListItem button component={Link} to="/configuracoes">
          <ListItemIcon>
            <Settings sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'var(--mui-palette-primary-contrastText)' }} primary="Configurações" />
        </ListItem>
        <ListItem button component={Link} to="/sair">
          <ListItemIcon>
            <Logout sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'var(--mui-palette-primary-contrastText)' }} primary="Sair" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
