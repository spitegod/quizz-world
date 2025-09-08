import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5002/api/auth/login', {
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/create'); // Редирект на страницу создания викторины
      }
    } catch (err) {
      setError('Неверный email или пароль');
      console.error('Ошибка входа:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Войти</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
}

export default Login;