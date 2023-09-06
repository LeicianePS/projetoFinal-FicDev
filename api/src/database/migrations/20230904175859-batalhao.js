'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('batalhao', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            nome_batalhao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            data_fundacao: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            comandante: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tipo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            efetivo: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            missao_valores: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            contato: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            comando_regional: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('batalhao');
    }
};
