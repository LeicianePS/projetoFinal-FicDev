const { HttpHelper } = require('../utils/http-helper');
const { RegiaoModel } = require('../models/regiao-model');
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
            return httpHelper.created(regiao);
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
            const regiaoExists = await RegiaoModel.findOne({ where: { id_regiao } });
            if (!regiaoExists) return httpHelper.notFound('Região não encontrado!');
            await RegiaoModel.destroy({ where: { id_regiao } });
            return httpHelper.ok({
                message: 'Região deletado com sucesso!'
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
            // if (crn) {
            //     const unityIsValid = Validates.validUnity(crn);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const regiaoExists = await RegiaoModel.findByPk(id_regiao);
            if (!regiaoExists) return httpHelper.notFound('Região não encontrado!');
            await RegiaoModel.update({
                nome_regiao, populacao, cidadesbairros_atuacao
            }, {
                where: { id_regiao }
            });
            return httpHelper.ok({
                message: 'Região atualizado com sucesso!'
            });
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
