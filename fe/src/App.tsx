import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import AppRoutes from './routes/AppRoutes';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Helmet titleTemplate="%s - ReactApp"></Helmet>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
