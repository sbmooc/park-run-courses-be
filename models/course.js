'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      this.association = this.belongsTo(models.Event)
    }
  };
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    lnglat: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};