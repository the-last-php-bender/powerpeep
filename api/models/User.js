// models/user.js
'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {

}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mobile_id:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
      }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true
});

export default User;
