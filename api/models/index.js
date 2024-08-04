'use strict';

import path from 'path';
import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Reminder from './Reminder.js';
import Battery from './Battery.js';

// Initialize models
const models = {
  User,
  Reminder,
  Battery
};

Object.values(models).forEach(model => {
  model.init(model.attributes, {
    sequelize,
    modelName: model.name.toLowerCase()
  });
});

// Associate models
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

User.hasOne(Reminder, { as: 'Reminder', foreignKey: 'user_id' });
User.hasOne(Battery, { as: 'Reminder', foreignKey: 'user_id' });
const db = {
  sequelize,
  Sequelize,
  User,
  Battery,
  Reminder
};
export default db;
