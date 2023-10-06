require('../database');
const bcrypt = require("bcrypt");
const { UsuarioModel } = require("../models/usuario-model");
const usuarios = [
    {
        nome: "Admin",
        matricula: 203040,
        email: "admin@email.com",
        telefone: "(65)99988-5555",
        perfil: "admin",
        cpf: "123.654.789-99",
        senha: "123.654.789-99"
    },
    {
        nome: "Leiciane P de Souza",
        matricula: 212223,
        email: "leicyani2011@gmail.com",
        telefone: "(65)99988-7777",
        perfil: "admin",
        cpf: "062.019.901-10",
        senha: "062.019.901-10"
    },
    {
        nome: "Usuário Teste",
        matricula: 123456,
        email: "teste@email.com",
        telefone: "(65)99988-6666",
        perfil: "teste",
        cpf: "123.456.789-10",
        senha: "123.456.789-10"
    },
];
async function criarUsuarios() {
 for (let usuario of usuarios) {
  await UsuarioModel.create({
   nome: usuario.nome,
   senha: await bcrypt.hash(usuario.senha, Number(process.env.SALT)),
   matricula: usuario.matricula,
   email: usuario.email,
   telefone: usuario.telefone,
   perfil: usuario.perfil,
   cpf: usuario.cpf,
  });
 }
}
(async () => {
 await criarUsuarios();
 console.log("Usuarios cadastrados!");
})();
