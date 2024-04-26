const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cors = require('cors');


const app = express();
const port = 3000;

// Подключение к базе данных PostgreSQL
const db = pgp({
  connectionString: 'postgresql://postgres:12345@localhost:5432/DominiDB'
});

// Middleware для обработки JSON-запросов
app.use(bodyParser.json());

app.use(cors());

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Хэшируем пароль перед сохранением в базу данных
    const hashedPassword = await bcrypt.hash(password, 10);
    // Вставляем данные нового пользователя в таблицу users
    await db.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, hashedPassword]);
    res.json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error('Ошибка регистрации пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Аутентификация пользователя
app.post('/loginForm', async (req, res) => {
  const { username, password } = req.body;

    // Получаем данные пользователя из базы данных
    const user = await db.oneOrNone('SELECT Login FROM Users WHERE Login = $1', username);
    if (!user) {
      return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }

    console.log(req);
    return user;
    // Сравниваем хэши паролей
  //   const match = await bcrypt.compare(password, user.password);
  //   if (!match) {
  //     return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
  //   }
  //   // Генерируем JWT токен
  //   const token = jwt.sign({ username: user.username }, 'secret');
  //   res.json({ token });
  // } catch (error) {
  //   console.error('Ошибка аутентификации пользователя:', error);
  //   res.status(500).json({ error: 'Ошибка сервера' });
  //}

  });

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
