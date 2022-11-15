import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Userdash from './components/Userdash';
import { User } from './models/user';

const theme = createTheme();

function App() {

  const [authUser, setAuthUser] = useState<User>(); // generic to define type for state

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}>
          <Navbar currentUser={authUser} setCurrentUser={setAuthUser} />
          <Box sx={{
            flexGrow: 1,
          }}>
            <Routes>
              <Route path="/" element={<Login currentUser={authUser} setCurrentUser={setAuthUser} />} />
              <Route path="/login" element={<Login currentUser={authUser} setCurrentUser={setAuthUser} />} />
              <Route path="/dashboard" element={<Dashboard currentUser={authUser} />} />
              <Route path="/register" element={<Register currentUser={authUser} />} />
              <Route path="/userdash" element={<Userdash currentUser={authUser} />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
