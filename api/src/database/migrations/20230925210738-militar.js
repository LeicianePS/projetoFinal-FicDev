'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('militar', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            nascimento: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            posto: {
                type: Sequelize.STRING,
                allowNull: false
            },
            salario_atual: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            matricula: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            },
            id_batalhao: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('militar');
    }
};
