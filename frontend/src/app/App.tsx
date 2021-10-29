import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { store } from 'stores';
import { ToastContainer } from 'react-toastify';
import InitializeState from './InitializeState';
import TopLoading from 'views/components/TopLoading';
import materialUiTheme from './customMaterialUi';
import Routes from 'app/routes';
import Header from 'views/components/Header';
import Footer from 'views/components/Footer';
import 'assets/tailwind-build.css';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/style.css';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={materialUiTheme} >
          <InitializeState />
          <TopLoading />
          <Header />
          <React.Suspense fallback={`loading`}>
            <Routes />
          </React.Suspense>
          <Footer />
          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </Router>
  );
}

export default App;
