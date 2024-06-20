import { Sequelize } from "sequelize";

require('dotenv').config();


const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.PORT,
  });
  
  console.log(process.env.DB_NAME)
  async function testDBConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  testDBConnection();

  //module.exports = sequelize;
  export default sequelize;