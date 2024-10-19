import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { navBarRoutesConfig } from '../config/routes.config';
import { colors } from '../utils/colors.utils';

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            backgroundColor: colors.teal,
            color: colors.white,
            boxShadow: '0 0 1rem rgba(0, 0, 0, 0.2)',
          }}
        >
          {navBarRoutesConfig.map(({ title, path }) => (
            <Button
              key={`nav-button-${title}-${path}`}
              component={RouterLink}
              to={path}
              color="inherit"
            >
              {title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
