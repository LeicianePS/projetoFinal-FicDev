const { HttpHelper } = require('../utils/http-helper');
const { NutricionistaModel } = require('../models/nutricionista-model');
const { Validates } = require('../utils/validates');

class NutricionistaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome, crn } = request.body;
            if (!nome) return httpHelper.badRequest('Parâmetros inválidos!');
            // if (crn) {
            //     const unityIsValid = Validates.validUnity(crn);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const nutrionista = await NutricionistaModel.create({
                nome, crn
            });
            return httpHelper.created(nutrionista);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const nutrionistas = await NutricionistaModel.findAll();
            return httpHelper.ok(nutrionistas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const nutrionistaExists = await NutricionistaModel.findOne({ where: { id } });
            if (!nutrionistaExists) return httpHelper.notFound('Nutricionista não encontrado!');
            await NutricionistaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Nutricionista deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nome, crn } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            // if (crn) {
            //     const unityIsValid = Validates.validUnity(crn);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const nutrionistaExists = await NutricionistaModel.findByPk(id);
            if (!nutrionistaExists) return httpHelper.notFound('Nutricionista não encontrado!');
            await NutricionistaModel.update({
                nome, crn
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Nutricionista atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { NutricionistaController };
