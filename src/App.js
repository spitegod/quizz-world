import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Компоненты страниц
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import PlayQuiz from './pages/PlayQuiz';
import Login from './components/Login';
import Register from './components/Register';

// Компонент для защищенных маршрутов
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Здесь можно добавить проверку токена на валидность
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    return <Navigate to="/login" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <header>
          <h1>QuizWorld</h1>
          <nav>
            {isAuthenticated ? (
              <button onClick={handleLogout}>Выйти</button>
            ) : (
              <>
                <a href="/login">Вход</a>
                <a href="/register">Регистрация</a>
              </>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute>
                  <CreateQuiz />
                </ProtectedRoute>
              } 
            />
            <Route path="/play/:id" element={<PlayQuiz />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
