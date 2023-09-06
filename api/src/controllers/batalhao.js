const { HttpHelper } = require('../utils/http-helper');
const { BatalhaoModel } = require('../models/batalhao-model');
const { Validates } = require('../utils/validates');

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
            return httpHelper.created(batalhao);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const batalhoes = await BatalhaoModel.findAll();
            debugger
            return httpHelper.ok(batalhoes);
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
                message: 'Batalhao deletado com sucesso!'
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
                message: 'Batalhao atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { BatalhaoController };
