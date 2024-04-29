const express = require('express');
const pgp = require('pg-promise')();
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcrypt');

//const bodyParser = require('body-parser');
//const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

//Отзывы
app.get('/', async (req, res) => {
  try {
    const reviewsFromDB = await db.any('SELECT photo, name, surname, text, wphoto FROM reviews');
    

    if (reviewsFromDB) {
      // Если данные из базы данных пусты, отправляем данные по умолчанию
      const defaultData = [
        {
          photo: "photo",
          name: "Default Name",
          surname: "Default Surname",
          text: "Default Review Text",
          wphoto: "wphoto",
        }
      ];
    }

    res.status(200).json(reviewsFromDB);

  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).json({ success: false, message: 'Ошибка при выполнении запроса' });
  }

});

// Аутентификация пользователя
app.post('/loginForm', async (req, res) => {
  const { username, password } = req.body.data;
    try {
      // Получаем данные пользователя из базы данных
      const login_user = await db.oneOrNone('SELECT * FROM users WHERE login = $1', username);
      console.log('по api пришло: ', req.body.data)
      console.log('из базы пришло: ', login_user)
      
      const match = await bcrypt.compare(password, login_user.password);
      console.log(match)
      
      
    if (login_user !== null && login_user.login === username && match)
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
      const hashPassword = await bcrypt.hash(password, 10);
      await db.none('INSERT INTO users(login, password) VALUES($1, $2)', [username, hashPassword]);
      res.json({ message: 'Пользователь успешно зарегистрирован' });
  } 
  catch (error) {
      console.error('Ошибка регистрации пользователя:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
  }
});