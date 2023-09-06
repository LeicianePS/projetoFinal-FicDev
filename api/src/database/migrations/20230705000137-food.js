'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('food', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            unidadeMedida: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: 'kg'
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('food');
    }
};
