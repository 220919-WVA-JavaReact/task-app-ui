import React, { useState } from 'react';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import { User } from './models/user';
import Navbar from './components/nav/Navbar';
import Register from './components/register/Register';
import Userdash from './components/userdash/Userdash';
import Profile from './components/profile/Profile';
import Footer from './components/footer/Footer';
import { Box } from '@mui/material';

function App() {

  const [authUser, setAuthUser] = useState<User>(); // generic to define type for state

  return (
    <BrowserRouter>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar currentUser={authUser} setCurrentUser={setAuthUser} />
        <Routes>
          <Route path="/" element={<Login currentUser={authUser} setCurrentUser={setAuthUser} />} />
          <Route path="/login" element={<Login currentUser={authUser} setCurrentUser={setAuthUser} />} />
          <Route path="/dashboard" element={<Dashboard currentUser={authUser} />} />
          <Route path="/register" element={<Register currentUser={authUser} />} />
          <Route path="/profile" element={<Profile currentUser={authUser} setCurrentUser={setAuthUser} />} />
          <Route path="/userdash" element={<Userdash currentUser={authUser} />} />
        </Routes>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
