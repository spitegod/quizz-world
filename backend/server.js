require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
const PORT = 5002; // Принудительно устанавливаем порт 5002
const HOST = '0.0.0.0'; // Принимаем соединения со всех интерфейсов

// Test route
app.get('/test', (req, res) => {
  console.log('Тестовый запрос получен!');
  res.json({ message: 'Сервер работает!' });
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Укажите URL вашего фронтенда
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// API Routes
app.use('/api', routes);

// Serve the React app for any other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Sync database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // В режиме разработки пересоздаем таблицы при каждом перезапуске
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force: false });
      console.log('Database synchronized');
    }

    app.listen(PORT, HOST, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
