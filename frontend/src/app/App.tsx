import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { store } from 'stores';
import InitializeState from './InitializeState';
import materialUiTheme from './customMaterialUi';
import Routes from 'routes';
import Header from 'views/components/Header';
import 'assets/main.css';
import 'rc-trigger/assets/index.css';
import 'assets/style.css';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={materialUiTheme} >
          <InitializeState />
          <Header />
          <Routes />
        </ThemeProvider>
      </Provider>
    </Router>
  );
}

export default App;
