const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UsuarioModel } = require('../models/usuario-model');

class UsuarioController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome, cpf, email, senha, telefone, matricula } = request.body;
            if (!email || !senha) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const usuarioAlreadyExists = await UsuarioModel.findOne({ where: { email } });
            if (usuarioAlreadyExists) return httpHelper.badRequest('E-mail de usuário já cadastrado!');
            const passwordHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            const usuario = await UsuarioModel.create({
                nome,
                cpf,
                email,
                senha: passwordHashed,
                telefone,
                matricula
            });
            if (!usuario) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: usuario.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, password } = request.body;
            if (!email || !password) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const usuarioExists = await UsuarioModel.findOne({ where: { email } });
            if (!usuarioExists) return httpHelper.notFound('Usuário não encontrado!');
            const isPasswordValid = await bcrypt.compare(password, usuarioExists.password);
            if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');
            const accessToken = jwt.sign(
                { id: usuarioExists.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
















    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const usuarios = await UsuarioModel.findAll();
            return httpHelper.ok(usuarios);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const usuarioExists = await UsuarioModel.findOne({ where: { id } });
            if (!usuarioExists) return httpHelper.notFound('Usuário não encontrado!');
            await UsuarioModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Usuário deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nome, cpf, email, senha, telefone, matricula } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            // if (crn) {
            //     const unityIsValid = Validates.validUnity(crn);
            //     if (!unityIsValid) return httpHelper.badRequest('Unidade de medida inválido!');
            // }
            const usuarioExists = await UsuarioModel.findByPk(id);
            const passwordHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            if (!usuarioExists) return httpHelper.notFound('Usuário não encontrado!');
            await UsuarioModel.update({
                nome,
                cpf,
                email,
                senha: passwordHashed,
                telefone,
                matricula
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Usuário atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { UsuarioController };
