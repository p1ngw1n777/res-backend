import DataTypes from 'sequelize';
import sequelize from '../databaseConfig.js'; // Подключение к базе данных 

// Определение модели Review
const Review = sequelize.define('reviews', {
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    wphoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  //module.exports = Review;
  export default Review;