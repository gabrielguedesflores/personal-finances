import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const isLoggedIn = false;
  return (
    <Router>
      <Routes>
        <Route path="/" element={ isLoggedIn ? <HomePage /> : <LoginPage /> } />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
