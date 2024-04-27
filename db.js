const pgp = require('pg-promise')();
 
const db = pgp({
    connectionString: 'postgres://postgres:12345@localhost:5432/DominiDB'
  });

async function testDatabaseConnection() {
  try {
    const connection = await db.connect(); // Устанавливаем соединение
    connection.done(); // Закрываем соединение
    console.log('Подключение к базе данных установлено');
  } 
  catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
  }
}

testDatabaseConnection();

module.exports = db;
