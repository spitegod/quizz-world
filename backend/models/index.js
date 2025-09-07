const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize({
  ...config,
  storage: process.env.DB_STORAGE || config.storage,
  dialect: process.env.DB_DIALECT || config.dialect,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// Импорт моделей
const models = {
  User: require('./user')(sequelize),
  Quiz: require('./quiz')(sequelize),
  Question: require('./question')(sequelize),
  AnswerOption: require('./answerOption')(sequelize),
  QuizSession: require('./quizSession')(sequelize),
  UserAnswer: require('./userAnswer')(sequelize)
};

// Установка связей
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  ...models,
  sequelize,
  Sequelize
};
