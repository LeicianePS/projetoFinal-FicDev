require('../database');
const bcrypt = require("bcrypt");
const { UsuarioModel } = require("../models/usuario-model");
const usuarios = [
 {
  nome: "Admin",
  matricula: 123456,
  email: "admin@email.com",
  telefone: "(65)99988-7766",
  perfil: "admin",
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
