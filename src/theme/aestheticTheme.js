import { createTheme } from '@mui/material/styles';

export const aestheticTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#800020', // Wine
      light: '#9c2742',
      dark: '#5d0018',
    },
    secondary: {
      main: '#FFD700', // Gold
      light: '#ffdf33',
      dark: '#c8aa00',
    },
    background: {
      default: '#FFF8E1',
      paper: '#FFFDF7',
    },
    text: {
      primary: '#212121',
      secondary: '#424242',
    },
    info: {
      main: '#000080', // Navy blue
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Georgia", serif',
    h1: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
      fontFamily: '"Playfair Display", "Georgia", serif',
    },
    h6: {
      fontWeight: 600,
      fontFamily: '"Playfair Display", "Georgia", serif',
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
