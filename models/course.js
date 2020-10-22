'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      this.event = this.belongsTo(models.Event)
    }
  };
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};