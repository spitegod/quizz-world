const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware для проверки аутентификации
const auth = async (req, res, next) => {
  try {
    // Получаем токен из заголовка Authorization
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Необходима авторизация' });
    }

    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Находим пользователя по ID из токена
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    // Добавляем данные пользователя в запрос
    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Срок действия токена истек' });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Неверный токен' });
    }
    
    res.status(500).json({ message: 'Ошибка при проверке аутентификации' });
  }
};

// Middleware для проверки ролей
const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Пользователь не аутентифицирован' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Недостаточно прав' });
    }
    
    next();
  };
};

module.exports = {
  auth,
  checkRole
};
