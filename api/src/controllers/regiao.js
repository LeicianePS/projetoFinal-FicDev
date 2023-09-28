const { HttpHelper } = require('../utils/http-helper');
const { RegiaoModel } = require('../models/regiao-model');
const { BatalhaoModel } = require('../models/batalhao-model'); //
const { Validates } = require('../utils/validates');

const { Sequelize } = require('sequelize');
const configDatabase = require('../database/config');

const sequelize = new Sequelize(configDatabase);

class RegiaoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id_regiao, nome_regiao, populacao, cidadesbairros_atuacao } = request.body;
            if (!nome_regiao && !populacao && !cidadesbairros_atuacao) return httpHelper.badRequest('Parâmetros inválidos!');
            // if (crn) {
            //     const unityIsValid = Validates.validUnity(crn);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const regiao = await RegiaoModel.create({
                id_regiao : id_regiao, nome_regiao, populacao, cidadesbairros_atuacao
            });
            return httpHelper.created({
                regiao,
                message: "Região criada com sucesso!",
                variant: "success"
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const regioes = await RegiaoModel.findAll();
            return httpHelper.ok(regioes);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id_regiao } = request.params;
            if (!id_regiao) return httpHelper.badRequest('Parâmetros inválidos!');
            const teste = id_regiao
            const regiaoBatalhao = await BatalhaoModel.findOne({ where: { id_regiao } });
            if (regiaoBatalhao) return httpHelper.badRequest(`Não foi possível remover! O registro apresenta referência em Batalhões.`, );

            const regiaoExists = await RegiaoModel.findOne({ where: { id_regiao } });
            if (!regiaoExists) return httpHelper.notFound('Região não encontrada!');
            await RegiaoModel.destroy({ where: { id_regiao } });
            return httpHelper.ok({
                message: 'Região deletada com sucesso!',
                variant: 'success'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id_regiao } = request.params;
            const { nome_regiao, populacao, cidadesbairros_atuacao } = request.body;
            if (!id_regiao) return httpHelper.badRequest('Parâmetros inválidos!');

            const regiaoExists = await RegiaoModel.findByPk(id_regiao);
            if (!regiaoExists) return httpHelper.notFound('Região não encontrado!');
            await RegiaoModel.update({
                nome_regiao, populacao, cidadesbairros_atuacao
            }, {
                where: { id_regiao }
            });
            return httpHelper.ok({
                message: 'Região atualizado com sucesso!',
                variant: "success"

            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }






    async getById(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id_regiao } = request.params;
            const regiao = await RegiaoModel.findByPk(id_regiao);
            return httpHelper.ok(regiao);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }




    async regioesFiltro(request, response) {
        const httpHelper = new HttpHelper(response);

        const paramPesquisa = request.body.paramPesquisa;

        try {
            const results = await sequelize.query(
                `SELECT * FROM regiao WHERE nome_regiao LIKE :paramPesquisa OR cidadesbairros_atuacao LIKE :paramPesquisa`,
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
}

module.exports = { RegiaoController };
