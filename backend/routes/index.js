const express = require('express');
const router = express.Router();

// Импортируем маршруты
const authRoutes = require('./auth');

// Подключаем маршруты
router.use('/auth', authRoutes);

// Тестовый защищенный маршрут
router.get('/protected', (req, res, next) => {
  res.json({ message: 'Это защищенный маршрут!' });
});

module.exports = router;
