import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    grey: {
      50: '#EBEBEB',
      100: '#A6A6A6',
      200: '#5F5F5F',
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", sans-serif',

    h6: {
      fontFamily: '"Noto Sans TC", sans-serif',
      fontWeight: 500,
      fontSize: '19.22px',
      letterSpacing: 0,
      color: '#EBEBEB',
    },

    button: {
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: 0,
      textTransform: 'none',
      color: '#EBEBEB',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          color: '#EBEBEB',
        },
        head: {
          fontFamily: '"Noto Sans TC", sans-serif',
          fontWeight: 500,
          fontSize: '11.81px',
          lineHeight: '20px',
          letterSpacing: 0,
          color: '#A6A6A6',
          padding: '0 8px',
        },
        body: {
          fontFamily: '"PingFang SC", "Noto Sans TC", sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '22px',
          letterSpacing: 0,
          padding: '0 4px',
          height: '46px',
        },
      },
    },
  },
});

export default theme;
