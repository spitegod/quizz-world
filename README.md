# Quiz World

## Установка и запуск

### Требования
- Node.js 16.x или новее
- npm 8.x или новее

### Инструкция по запуску

1. **Клонируйте репозиторий**
   ```bash
   git clone <ваш-репозиторий>
   cd quizz-world
   ```

2. **Установите зависимости фронтенда**
   ```bash
   npm install
   ```

3. **Установите зависимости бэкенда**
   ```bash
   cd backend
   npm install
   ```

4. **Создайте .env файл**
   Создайте файл `.env` в папке `backend` с настройками:
   ```
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=24h
   PORT=5002
   ```

5. **Запустите бэкенд** (в отдельном терминале)
   ```bash
   cd backend
   node server.js
   ```

6. **Запустите фронтенд** (в основном терминале)
   ```bash
   npm start
   ```

7. **Откройте в браузере**
   - Фронтенд: http://localhost:3000
   - Бэкенд: http://localhost:5002

## Доступные скрипты

- `npm start` - запуск фронтенда в режиме разработки
- `npm run build` - сборка для продакшена
- `npm test` - запуск тестов

## Структура проекта

- `/src` - исходный код фронтенда
- `/backend` - исходный код бэкенда
  - `/controllers` - контроллеры API
  - `/models` - модели базы данных
  - `/routes` - маршруты API
  - `server.js` - точка входа бэкенда

## Технологии

- **Фронтенд**: React, React Router, Axios
- **Бэкенд**: Node.js, Express, SQLite, Sequelize, JWT

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
