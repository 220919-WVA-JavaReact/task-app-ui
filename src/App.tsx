import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import { User } from './models/user';

function App() {
  
  const [authUser, setAuthUser] = useState<User>();

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login currentUser={authUser} setCurrentUser={setAuthUser}/>}/>
          <Route path="/dashboard" element={<Dashboard currentUser={authUser} />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
