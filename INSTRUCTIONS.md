# Инструкция по запуску проекта

## Обязательные шаги:

1. **Установите Node.js**
   - Скачайте и установите Node.js 16.x или новее с [официального сайта](https://nodejs.org/)
   - Проверьте установку:
     ```bash
     node -v
     npm -v
     ```

2. **Склонируйте репозиторий**
   ```bash
   git clone <ваш-репозиторий>
   cd quizz-world
   ```

3. **Настройте бэкенд**
   ```bash
   cd backend
   npm install
   ```
   - Создайте файл `.env` в папке `backend` с настройками:
     ```
     JWT_SECRET=your-secret-key-123
     JWT_EXPIRES_IN=24h
     PORT=5002
     ```

4. **Настройте фронтенд**
   ```bash
   cd ..
   npm install
   ```

5. **Запустите приложение**
   - В первом терминале (бэкенд):
     ```bash
     cd backend
     node server.js
     ```
   - Во втором терминале (фронтенд):
     ```bash
     npm start
     ```

## Возможные проблемы и решения:

1. **Ошибка с портами**
   - Если порты 3000 или 5002 заняты, измените их в:
     - Для фронтенда: `package.json` в строке `"start": "set PORT=3000 && react-scripts start"`
     - Для бэкенда: в файле `.env` в папке `backend`

2. **Ошибки при установке зависимостей**
   ```bash
   # Удалите node_modules и package-lock.json
   rm -rf node_modules package-lock.json
   
   # Очистите кеш npm
   npm cache clean --force
   
   # Установите зависимости заново
   npm install
   ```

3. **Проблемы с базой данных**
   - Убедитесь, что файл базы данных существует в папке `backend/database`
   - Если база данных не создается автоматически, выполните миграции:
     ```bash
     cd backend
     npx sequelize-cli db:migrate
     ```

## Контакты
Если возникнут проблемы, обращайтесь к [ваше имя] по [ваш email/телеграм].
