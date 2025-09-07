const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { validationResult } = require('express-validator');

// Регистрация пользователя
const register = async (req, res) => {
  try {
    console.log('Получен запрос на регистрацию:', req.body);
    
    // Валидация входных данных
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Ошибки валидации:', errors.array());
      return res.status(400).json({ 
        message: 'Ошибка валидации',
        errors: errors.array() 
      });
    }

    const { username, email, password } = req.body;
    console.log('Попытка регистрации пользователя:', { username, email });

    try {
      // Проверяем, существует ли пользователь
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log('Пользователь с таким email уже существует:', email);
        return res.status(400).json({ 
          message: 'Пользователь с таким email уже существует' 
        });
      }

      // Создаем пользователя (пароль хешируется автоматически в хуке beforeSave)
      console.log('Создание пользователя в базе данных...');
      const user = await User.create({
        username,
        email,
        password: password, // Виртуальное поле для валидации
        password_hash: 'temporary_hash' // Временное значение, будет перезаписано в хуке
      });

      console.log('Пользователь создан:', user.id);

      // Создаем JWT токен
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      console.log('Токен создан для пользователя:', user.id);

      res.status(201).json({
        message: 'Пользователь успешно зарегистрирован',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (dbError) {
      console.error('Ошибка при работе с базой данных:', dbError);
      throw dbError; // Пробрасываем ошибку в общий блок catch
    }
  } catch (error) {
    console.error('Критическая ошибка при регистрации:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      ...error
    });
    
    res.status(500).json({ 
      message: 'Ошибка при регистрации пользователя',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Вход пользователя
const login = async (req, res) => {
  console.log('=== НОВАЯ ПОПЫТКА ВХОДА ===');
  console.log('Получен запрос на вход:', { 
    email: req.body.email,
    headers: req.headers,
    body: req.body 
  });

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('ОШИБКА: Не указан email или пароль');
      return res.status(400).json({ message: 'Укажите email и пароль' });
    }

    console.log('Поиск пользователя с email:', email);
    
    // Находим пользователя с явным указанием атрибутов
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'username', 'password_hash', 'role']
    });

    if (!user) {
      console.log('ОШИБКА: Пользователь не найден');
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    console.log('Пользователь найден:', {
      id: user.id,
      email: user.email,
      hasPasswordHash: !!user.password_hash,
      passwordHashLength: user.password_hash ? user.password_hash.length : 0
    });

    // Проверяем пароль
    console.log('Начало проверки пароля...');
    try {
      const isMatch = await bcrypt.compare(password, user.password_hash);
      console.log('Результат проверки пароля:', isMatch ? 'СОВПАДЕНИЕ' : 'НЕВЕРНЫЙ ПАРОЛЬ');
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }
    } catch (error) {
      console.error('КРИТИЧЕСКАЯ ОШИБКА при проверке пароля:', {
        message: error.message,
        stack: error.stack
      });
      return res.status(500).json({ 
        message: 'Ошибка при проверке учетных данных',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    // Создаем JWT токен
    console.log('Создание JWT токена...');
    try {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      console.log('Токен успешно создан для пользователя:', user.id);
      
      res.json({
        success: true,
        message: 'Вход выполнен успешно',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('ОШИБКА при создании токена:', error);
      return res.status(500).json({ 
        message: 'Ошибка при создании токена',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } catch (error) {
    console.error('НЕОБРАБОТАННАЯ ОШИБКА при входе:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: 'Внутренняя ошибка сервера',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Получение данных текущего пользователя
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password_hash'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
  }
};

module.exports = {
  register,
  login,
  getMe
};
