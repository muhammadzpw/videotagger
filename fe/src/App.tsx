import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import AppRoutes from './routes/AppRoutes';
import { theme } from './styles/theme';
import { FileCtx } from './components/FileContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FileCtx>
        <Helmet
          titleTemplate="%s - Video Tagger"
          defaultTitle="Video Tagger"
        ></Helmet>
        <AppRoutes />
      </FileCtx>
    </ThemeProvider>
  );
}

export default App;
