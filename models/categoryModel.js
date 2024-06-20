import { DataTypes } from 'sequelize';
import sequelize from '../databaseConfig.js'; // Подключение к базе данных 

const Category = sequelize.define('category', {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_url_photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

//module.exports = Category;
export default Category;