'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Problem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Problem.belongsTo(models.User,{
        foreignKey:'userId'
      });

      Problem.hasMany(models.Solution,{
        foreignKey:'problemId'
      });

      Problem.hasMany(models.Note,{
        foreignKey:'problemId'
      });
    }
  }
  Problem.init({
    userId: DataTypes.BIGINT,
    statement: DataTypes.STRING,
    link: DataTypes.STRING,
    status: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    flagged:DataTypes.BOOLEAN,
    topics:DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Problem',
  });
  return Problem;
};