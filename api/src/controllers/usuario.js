const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UsuarioModel } = require('../models/usuario-model');

const { Sequelize } = require('sequelize');
const configDatabase = require('../database/config');

const sequelize = new Sequelize(configDatabase);

const nodemailer = require('nodemailer');
require('dotenv').config();


let tokenSenha = ""

class UsuarioController {

    async solicitarRecuperarSenha(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email } = request.body;
            const usuarioExists = await UsuarioModel.findOne({ where: { email } });
            if (!usuarioExists) return httpHelper.notFound('Usuário não encontrado!');

            // Token JWT com o e-mail informado para envio do link e reset de senha
            tokenSenha = jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '20m' });

            // URL de redefinição de senha com o token
            const resetPasswordUrl = `http://localhost:3000/recuperar-senha?token=${tokenSenha}`; // tive que tirar o hhtps pois o navegador não estava abrindo a página

            // Configuração do transporte do nodemailer
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD,
              },
            });

            // Configuração do e-mail de recuperação de senha
            const mailOptions = {
              from: process.env.GMAIL_EMAIL,
              to: email,
              subject: 'Recuperação de Senha',
              text: `Você solicitou a recuperação de senha. Clique neste link para redefinir sua senha: ${resetPasswordUrl}`,
            };

            await transporter.sendMail(mailOptions); // Enviando o e-mail com o link de recuperação

            response.status(200).json({
                message: `E-mail de recuperação de senha enviado com sucesso.`,
                messageToken: `${resetPasswordUrl}`,
                variant: 'success'
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Ocorreu um erro ao enviar o e-mail de recuperação de senha.' });
        }
    }


    async recuperarSenha(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { novaSenha, confirmacao, tokenSenhaRecebido } = request.body;
            const decoded = await jwt.verify(tokenSenhaRecebido, process.env.TOKEN_SECRET);  // Verifique se o token é válido e decodifique-o

            // Se o token for válido, decoded conterá os dados do usuário
            const usuario = await UsuarioModel.findOne({ where: { email: decoded.email } });
            if (!usuario) { return httpHelper.notFound('Usuário não encontrado!'); }

            if (novaSenha !== confirmacao) {
              return httpHelper.badRequest('A nova senha e a confirmação não coincidem');
            }

            const novaSenhaHashed = await bcrypt.hash(novaSenha, Number(process.env.SALT));
            await UsuarioModel.update({ senha: novaSenhaHashed }, { where: { email: decoded.email } });

            return httpHelper.ok({
                message: 'Nova senha salva com sucesso',
                variant: 'success'
            });
        } catch (error) {
            console.error('Erro ao salvar nova senha:', error);

            if (error.name === 'JsonWebTokenError') {
              return httpHelper.badRequest('Token de recuperação de senha inválido');
            }

            return httpHelper.internalError('Erro ao salvar nova senha');
        }
    }


    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome, cpf, email, telefone, matricula, perfil } = request.body;
            const senha = cpf;
            if (!nome || !cpf || !email || !telefone || !matricula) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const usuarioAlreadyExists = await UsuarioModel.findOne({ where: { cpf } });
            if (usuarioAlreadyExists) return httpHelper.badRequest('Informações de usuário já cadastrado!');

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
                matricula,
                perfil
            });
            if (!usuario) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: usuario.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({
                accessToken,
                message: "Usuário criado com sucesso!",
                variant: "success"
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { cpf, senha } = request.body;
            if (!cpf || !senha) return httpHelper.badRequest('CPF e senha são obrigatórios!');
            const usuarioExists = await UsuarioModel.findOne({ where: { cpf } });
            if (!usuarioExists) return httpHelper.notFound('Usuário não encontrado!');

            // const passwordHashed = await bcrypt.hash(
            //     senha,
            //     Number(process.env.SALT)
            // );

            const passwordHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );


            const isPasswordValid = await bcrypt.compare(senha, usuarioExists.senha);
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
            const usuarios = await UsuarioModel.findAll({
                attributes: ['id', 'nome', 'cpf', 'email', 'telefone', 'matricula', 'perfil']
            });
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
                message: 'Usuário deletado com sucesso!',
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
            const { nome, cpf, email, telefone, matricula, perfil } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const usuarioExists = await UsuarioModel.findByPk(id);
            // const passwordHashed = await bcrypt.hash(
            //     senha,
            //     Number(process.env.SALT)
            // );
            if (!usuarioExists) return httpHelper.notFound('Usuário não encontrado!');
            await UsuarioModel.update({
                nome,
                cpf,
                email,
                //senha: passwordHashed,
                telefone,
                matricula,
                perfil
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Região atualizada com sucesso!',
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
            const usuario = await UsuarioModel.findByPk(id, {
                attributes: ['id', 'nome', 'cpf', 'email', 'telefone', 'matricula', 'perfil']

            });
            return httpHelper.ok(usuario);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getByCPF(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { cpf } = request.params;
            const usuario = await UsuarioModel.findOne( {
                where: {cpf},
                attributes: ['id', 'nome', 'cpf', 'email', 'telefone', 'matricula', 'perfil']
            },);
            return httpHelper.ok(usuario);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async updateAtualizarSenha(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { senha, novaSenha, novaSenha2 } = request.body;
            const { id } = request.params;
            const usuarioExists = await UsuarioModel.findByPk(id);
            if (!usuarioExists) return httpHelper.notFound('Usuário não encontrado!');

            const isPasswordValid = await bcrypt.compare(senha, usuarioExists.senha);
            if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');

            const passwordHashed = await bcrypt.hash(
                novaSenha,
                Number(process.env.SALT)
            );

            const usuario = await UsuarioModel.update({
                senha: passwordHashed
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Senha atualizada com sucesso!',
                variant: "success"
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }



    async usuariosFiltro(request, response) {
        const httpHelper = new HttpHelper(response);

        const paramPesquisa = request.body.paramPesquisa;

        try {
            const results = await sequelize.query(
                `SELECT * FROM usuario WHERE nome LIKE :paramPesquisa OR email LIKE :paramPesquisa OR cpf LIKE :paramPesquisa`,
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

module.exports = { UsuarioController };
