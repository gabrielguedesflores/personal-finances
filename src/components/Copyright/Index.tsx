import { Link, Typography } from "@mui/material";

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 3 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        GabsCorp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;