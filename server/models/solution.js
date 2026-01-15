'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Solution.belongsTo(models.Problem,{
        foreignKey:'problemId'
      })
    }
  }
  Solution.init({
    problemId: DataTypes.NUMBER,
    title: DataTypes.STRING,
    code: DataTypes.TEXT,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Solution',
  });
  return Solution;
};