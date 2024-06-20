import { DataTypes } from 'sequelize';
import sequelize from '../databaseConfig'; // Подключение к базе данных 

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;