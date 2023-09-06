'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('regiao', {
            id_regiao: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            nome_regiao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            populacao: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cidadesbairros_atuacao: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('regiao');
    }
};
