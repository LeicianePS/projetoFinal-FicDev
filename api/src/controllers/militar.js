const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MilitarModel } = require('../models/militar-model');

const { Sequelize } = require('sequelize');
const configDatabase = require('../database/config');

const sequelize = new Sequelize(configDatabase);

require('dotenv').config();

// Configure a chave de API do SendGrid
//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let tokenSenha = ""


class MilitarController {

    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome, cpf, email, nascimento, posto, salario_atual, matricula, id_batalhao } = request.body;

            if (!nome || !cpf || !email || !nascimento || !posto || !salario_atual || !matricula || !id_batalhao) return httpHelper.badRequest('Os campos são obrigatórios!');
            const militarAlreadyExists = await MilitarModel.findOne({ where: { cpf } });
            if (militarAlreadyExists) return httpHelper.badRequest('Informações de militar já cadastrado!');

            const militar = await MilitarModel.create({
                nome,
                cpf,
                email,
                nascimento,
                posto,
                salario_atual,
                matricula,
                id_batalhao
            });
            if (!militar) return httpHelper.badRequest('Houve um erro ao criar militar');
            const accessToken = jwt.sign(
                { id: militar.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({
                accessToken,
                message: "Militar criado com sucesso!",
                variant: "success"
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }









    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const militares = await MilitarModel.findAll({
                // attributes: ['id', 'nome', 'cpf', 'email', 'nascimento', 'matricula', 'id_batalhao']
            });
            return httpHelper.ok(militares);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const militarExists = await MilitarModel.findOne({ where: { id } });
            if (!militarExists) return httpHelper.notFound('Militar não encontrado!');
            await MilitarModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Militar deletado com sucesso!',
                variant: 'success'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nome, cpf, email, nascimento, posto, salario_atual, matricula, id_batalhao } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const militarExists = await MilitarModel.findByPk(id);


            if (!militarExists) return httpHelper.notFound('Militar não encontrado!');
            await MilitarModel.update({
                nome,
                cpf,
                email,
                nascimento,
                posto,
                salario_atual,
                matricula,
                id_batalhao
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Militar atualizada com sucesso!',
                variant: "success"
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }







    async getById(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const militar = await MilitarModel.findByPk(id, {
                // attributes: ['id', 'nome', 'cpf', 'email', 'nascimento', 'matricula', 'id_batalhao']

            });
            return httpHelper.ok(militar);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getByCPF(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { cpf } = request.params;
            const militar = await MilitarModel.findOne( {
                where: {cpf},
                // attributes: ['id', 'nome', 'cpf', 'email', 'nascimento', 'matricula', 'id_batalhao']
            },);
            return httpHelper.ok(militar);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }



    async militaresFiltro(request, response) {
        const httpHelper = new HttpHelper(response);

        const paramPesquisa = request.body.paramPesquisa;

        try {
            const results = await sequelize.query(
                `SELECT * FROM militar WHERE nome LIKE :paramPesquisa OR email LIKE :paramPesquisa OR posto LIKE :paramPesquisa`,
            {
                replacements: { paramPesquisa: `%${paramPesquisa}%` }, // % é usado para corresponder a qualquer parte da string
                type: sequelize.QueryTypes.SELECT,
            }
              );
            return httpHelper.ok(results);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }



    async salariosTotal(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const salarioTotal = await MilitarModel.findAll({
                attributes: [
                  [sequelize.fn('SUM', sequelize.col('salario_atual')), 'somaSalario'],
                ],
              });
            return httpHelper.ok(salarioTotal);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async salariosMedia(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const salarioMedia = await MilitarModel.findAll({
                attributes: [
                  [sequelize.fn('AVG', sequelize.col('salario_atual')), 'mediaSalario'],
                ],
              });
            return httpHelper.ok(salarioMedia);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { MilitarController };
