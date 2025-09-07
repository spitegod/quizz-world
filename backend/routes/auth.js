const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../validators/authValidator');
const { auth } = require('../middleware/auth');

// Регистрация
router.post('/register', registerValidation, validate, authController.register);

// Вход
router.post('/login', loginValidation, validate, authController.login);

// Получение данных текущего пользователя
router.get('/me', auth, authController.getMe);

module.exports = router;
