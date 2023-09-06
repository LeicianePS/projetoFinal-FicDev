'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      'batalhao',
      'id_regiao',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: { model: 'regiao', key: 'id_regiao' },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('batalhao', 'id_regiao');

  }
};
