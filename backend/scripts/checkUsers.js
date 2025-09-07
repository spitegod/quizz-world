const { sequelize, User } = require('../models');

async function checkUsers() {
  try {
    // Проверяем подключение к БД
    await sequelize.authenticate();
    console.log('Соединение с БД успешно установлено.');

    // Получаем всех пользователей
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'password_hash', 'created_at']
    });

    console.log('\nНайдено пользователей:', users.length);
    console.log('----------------------------------');
    
    users.forEach(user => {
      console.log(`ID: ${user.id}`);
      console.log(`Имя: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log(`Пароль (хеш): ${user.password_hash.substring(0, 20)}...`);
      console.log(`Создан: ${user.created_at}`);
      console.log('----------------------------------');
    });
  } catch (error) {
    console.error('Ошибка при проверке пользователей:', error);
  } finally {
    await sequelize.close();
  }
}

checkUsers();
