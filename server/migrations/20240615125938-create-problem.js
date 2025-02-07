'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        type:Sequelize.BIGINT
      },
      statement: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      difficulty: {
        type: Sequelize.STRING
      },
      flagged: {
        type: Sequelize.BOOLEAN
      },
      topics:{
        type:Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Problems');
  }
};