import { createMuiTheme } from '@material-ui/core';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0150AA',
    },
    success: {
      main: '#49AE4D',
    },
    info: {
      main: '#2F80ED',
    },
    warning: {
      main: '#FF9800',
    },
  },
  typography: {
    fontFamily: 'inherit',
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
});

export const theme = createMuiTheme({
  ...defaultTheme,

  /*
  Overrides default style of each Material UI Element
   */
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: 24,
        fontWeight: defaultTheme.typography.fontWeightMedium,
        margin: defaultTheme.spacing(3, 0, 2),
      },
      h2: {
        fontSize: 20,
        fontWeight: defaultTheme.typography.fontWeightMedium,
        margin: defaultTheme.spacing(3, 0, 2),
      },
      caption: {
        fontWeight: defaultTheme.typography.fontWeightMedium,
      },
    },

    // To disable transform to capital in Button
    MuiButton: {
      root: {
        textTransform: 'initial',
      },
    },

    // To make input label and outlined input smaller
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 14px) scale(1)',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: defaultTheme.spacing(1.8, 1.75),
      },
    },
  },

  /*
  Change default Props in each Material UI Element
  */
  props: {
    MuiButton: {
      disableElevation: true,
      size: 'large',
      variant: 'contained',
      color: 'primary',
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
});
