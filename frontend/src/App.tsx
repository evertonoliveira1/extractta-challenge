import { createTheme, ThemeProvider } from '@mui/material/styles';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import BaseLayout from './components/BaseLayout/BaseLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import VehicleListPage from './pages/Vehicle/VehicleListPage';
import VehicleFormPage from './pages/Vehicle/VehicleFormPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<VehicleListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/vehicles" element={<VehicleListPage />} />
          <Route path="/vehicles/new" element={<VehicleFormPage />} />

          <Route path="/edit/:id" element={<VehicleFormPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </ThemeProvider>
);

const Layout: React.FC = () => {
  return (
    <>
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    </>
  );
};

export default App;

