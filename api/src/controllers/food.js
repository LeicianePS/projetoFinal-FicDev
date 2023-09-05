const { HttpHelper } = require('../utils/http-helper');
const { FoodModel } = require('../models/food-model');
const { Validates } = require('../utils/validates');

class FoodController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome, unidadeMedida } = request.body;
            if (!nome) return httpHelper.badRequest('Parâmetros inválidos!');
            if (unidadeMedida) {
                const unityIsValid = Validates.validUnity(unidadeMedida);
                if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            }
            const food = await FoodModel.create({
                nome, unidadeMedida
            });
            return httpHelper.created(food);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const foods = await FoodModel.findAll();
            return httpHelper.ok(foods);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const foodExists = await FoodModel.findOne({ where: { id } });
            if (!foodExists) return httpHelper.notFound('Alimento não encontrado!');
            await FoodModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Alimento deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nome, unidadeMedida } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            if (unidadeMedida) {
                const unityIsValid = Validates.validUnity(unidadeMedida);
                if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            }
            const foodExists = await FoodModel.findByPk(id);
            if (!foodExists) return httpHelper.notFound('Alimento não encontrado!');
            await FoodModel.update({
                nome, unidadeMedida
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Alimento atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { FoodController };
