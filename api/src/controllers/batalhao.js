const { HttpHelper } = require('../utils/http-helper');
const { BatalhaoModel } = require('../models/batalhao-model');
const { RegiaoModel } = require('../models/regiao-model');
const { Validates } = require('../utils/validates');

const { Sequelize } = require('sequelize');

const configDatabase = require('../database/config');
const sequelize = new Sequelize(configDatabase);

class BatalhaoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const {
                nome_batalhao,
                data_fundacao,
                comandante,
                tipo,
                efetivo,
                missao_valores,
                contato,
                comando_regional,
                status,
                id_regiao
            } = request.body;
            if (!nome_batalhao && !data_fundacao && !comandante && !tipo && !efetivo && !missao_valores && !contato && !comando_regional && !status && !id_regiao) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }
            // if (crn) {
            //     const unityIsValid = Validates.validUnity(crn);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const batalhao = await BatalhaoModel.create({
                nome_batalhao,
                data_fundacao,
                comandante,
                tipo,
                efetivo,
                missao_valores,
                contato,
                comando_regional,
                status,
                id_regiao
            });
            return httpHelper.created({
                batalhao,
                message: "Batalhão criado com sucesso!",
                variant: "success"
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const batalhoes = await BatalhaoModel.findAll();
            return httpHelper.ok(batalhoes);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }


    async getAllJoin(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const batalhoes = await BatalhaoModel.findAll({
                include: {
                  model: RegiaoModel,
                  attributes: ['nome_regiao']
                }
              });
            return httpHelper.ok(batalhoes);


        //     const results = await sequelize.query(

        //         `SELECT batalhao.*, regiao.nome_regiao
        //         FROM batalhao
        //         INNER JOIN regiao ON batalhao.id_regiao = regiao.id_regiao`,
        //        {
        //            type: sequelize.QueryTypes.SELECT,
        //        }
        //    );
           return httpHelper.ok(results);

        } catch (error) {
            return httpHelper.internalError(error);
        }
    }


    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const batalhaoExists = await BatalhaoModel.findOne({ where: { id } });
            if (!batalhaoExists) return httpHelper.notFound('Batalhao não encontrado!');
            await BatalhaoModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Batalhao deletado com sucesso!',
                variant: 'success',
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const {
                nome_batalhao,
                data_fundacao,
                comandante,
                tipo,
                efetivo,
                missao_valores,
                contato,
                comando_regional,
                status,
                id_regiao
            } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            // if (crn) {
            //     const unityIsValid = Validates.validUnity(crn);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const batalhaoExists = await BatalhaoModel.findByPk(id);
            if (!batalhaoExists) return httpHelper.notFound('Batalhao não encontrado!');
            await BatalhaoModel.update({
                nome_batalhao,
                data_fundacao,
                comandante,
                tipo,
                efetivo,
                missao_valores,
                contato,
                comando_regional,
                status,
                id_regiao
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Batalhao atualizado com sucesso!',
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
            const batalhao = await BatalhaoModel.findByPk(id);
            return httpHelper.ok(batalhao);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }


    // async batalhoesFiltro(request, response) {
    //     const httpHelper = new HttpHelper(response);

    //     const paramPesquisa = request.body.paramPesquisa;

    //     try {
    //         const results = await sequelize.query(
    //                 `SELECT * FROM batalhao WHERE nome_batalhao LIKE :paramPesquisa OR tipo LIKE :paramPesquisa OR comandante LIKE :paramPesquisa`,
    //             {
    //                 include: {
    //                     model: RegiaoModel,
    //                     attributes: ['nome_regiao']
    //                 },
    //                 replacements: { paramPesquisa: `%${paramPesquisa}%` }, // % é usado para corresponder a qualquer parte da string
    //                 type: sequelize.QueryTypes.SELECT,
    //             }
    //         );
    //         return httpHelper.ok(results);
    //     } catch (error) {
    //         return httpHelper.internalError(error);
    //     }
    // }
    async batalhoesFiltro(request, response) {
        const httpHelper = new HttpHelper(response);

        const paramPesquisa = request.body.paramPesquisa;

        try {
            const results = await sequelize.query(

                 `SELECT batalhao.*, regiao.nome_regiao
                 FROM batalhao
                 INNER JOIN regiao ON batalhao.id_regiao = regiao.id_regiao
                 WHERE batalhao.nome_batalhao LIKE :paramPesquisa
                 OR regiao.nome_regiao LIKE :paramPesquisa
                 OR batalhao.comandante LIKE :paramPesquisa`,
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

    async batalhoesTotal(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const batalhaoTotal = await BatalhaoModel.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'somaBatalhao'],
                ]
            });
            return httpHelper.ok(batalhaoTotal);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async batalhoesCR(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const batalhao_CR = await BatalhaoModel.findAll({
                attributes: [
                'comando_regional', // Substitua pelo nome correto do campo que identifica o Comando Regional
                [sequelize.fn('COUNT', sequelize.col('*')), 'quantidadeBatalhoes'],
                ],
                group: ['comando_regional'], // Substitua pelo nome correto do campo que identifica o Comando Regional
            });
            return httpHelper.ok(batalhao_CR);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async efetivoCR(request, response) { //`SELECT SUM(efetivo), comando_regional FROM batalhao GROUP BY comando_regional`
        const httpHelper = new HttpHelper(response);
        try {
            const efetivoCR = await BatalhaoModel.findAll({
                attributes: [
                  'comando_regional',
                  [sequelize.fn('SUM', sequelize.col('efetivo')), 'somaEfetivo'],
                ],
                group: ['comando_regional'],
              });
            return httpHelper.ok(efetivoCR);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async efetivoTotal(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const efetivoTotal = await BatalhaoModel.findAll({
                attributes: [
                  [sequelize.fn('SUM', sequelize.col('efetivo')), 'somaEfetivo'],
                ],
              });
            return httpHelper.ok(efetivoTotal);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { BatalhaoController };
