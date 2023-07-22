import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MonthlyExpenses from './pages/MonthlyExpenses';
import Income from './pages/Income';
import ImportExport from './pages/ImportExport';
import Reports from './pages/Reports';
import Config from './pages/Config';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/gastos-mensais"
          element={isLoggedIn ? <MonthlyExpenses /> : <Navigate to="/" />}
        />
        <Route
          path="/receitas"
          element={isLoggedIn ? <Income /> : <Navigate to="/" />}
        />
        <Route
          path="/importar-exportar"
          element={isLoggedIn ? <ImportExport /> : <Navigate to="/" />}
        />
        <Route
          path="/relatorios"
          element={isLoggedIn ? <Reports /> : <Navigate to="/" />}
        />
        <Route
          path="/configuracoes"
          element={isLoggedIn ? <Config /> : <Navigate to="/" />}
        />
        <Route
          path="/sair"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
