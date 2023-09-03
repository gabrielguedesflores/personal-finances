import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { IUserTypeDTO } from '../../dto/UserType.dto';

const UserData: React.FC<{ user: IUserTypeDTO }> = ({ user }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dados Cadastrais
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="userName"
            name="userName"
            label="Nome Completo"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={user.userName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required  
            id="userEmail"
            name="userEmail"
            label="E-mail"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={user.userEmail}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="userPassword"
            name="userPassword"
            label="Senha"
            fullWidth
            type="password"
            variant="standard"
            value={user.userPassword}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default UserData;
