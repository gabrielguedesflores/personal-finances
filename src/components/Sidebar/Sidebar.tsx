import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountBalanceWallet, AttachMoney, CreditCard, LocalAtm } from '@mui/icons-material';

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: 240, backgroundColor: '#f0f0f0', padding: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Sidebar
      </Typography>
      <Divider />

      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWallet />
          </ListItemIcon>
          <ListItemText primary="Banco" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary="Dinheiro" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CreditCard />
          </ListItemIcon>
          <ListItemText primary="Cartões" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LocalAtm />
          </ListItemIcon>
          <ListItemText primary="Investimentos" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
