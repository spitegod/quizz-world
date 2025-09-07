const { body, validationResult } = require('express-validator');

// Валидация регистрации
const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Имя пользователя обязательно')
    .isLength({ min: 3, max: 30 }).withMessage('Имя пользователя должно быть от 3 до 30 символов'),
    
  body('email')
    .trim()
    .notEmpty().withMessage('Email обязателен')
    .isEmail().withMessage('Неверный формат email'),
    
  body('password')
    .notEmpty().withMessage('Пароль обязателен')
    .isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов')
    .matches(/[A-Z]/).withMessage('Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[0-9]/).withMessage('Пароль должен содержать хотя бы одну цифру')
];

// Валидация входа
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email обязателен')
    .isEmail().withMessage('Неверный формат email'),
    
  body('password')
    .notEmpty().withMessage('Пароль обязателен')
];

// Middleware для обработки ошибок валидации
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidation,
  loginValidation,
  validate
};
