const express = require('express');
const pgp = require('pg-promise')();
const cors = require('cors');
const db = require('./db');

//const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

// Аутентификация пользователя
app.post('/loginForm', async (req, res) => {
  const { username, password } = req.body.data;

    
    console.log('введённый: ' + username, password);
    try {
      // Получаем данные пользователя из базы данных
      const login_user = await db.oneOrNone('SELECT * FROM users WHERE login = $1 AND password = $2', [username, password]);
      console.log('из базы: ' + login_user.login, login_user.password)
                  
      if (login_user.login === username && login_user.password === password)
      {
        console.log('Пользователь найден');
        res.status(200).json({ success: true, user: login_user });
      } 
      else 
      {
        console.log('Пользователь не найден');
        res.status(404).json({ success: false, message: 'Пользователь не найден' });
      }
    } 
    catch (error) {
        console.error('Ошибка при выполнении запроса к базе данных:', error);
        res.status(500).json({ success: false, message: 'Ошибка при выполнении запроса к базе данных' });
    }
  });

//Регистрация пользователя
app.post('/registration', async (req, res) => {
  const { username, password } = req.body.data;
  
  console.log(req.body.data);
  
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
    
      await db.none('INSERT INTO users(login, password) VALUES($1, $2)', [username, hashedPassword]);
      res.json({ message: 'Пользователь успешно зарегистрирован' });
  } 
  catch (error) {
    console.error('Ошибка регистрации пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

    // Получаем данные пользователя из базы данных
   
    // if (!user) {
    //    return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    // }


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






