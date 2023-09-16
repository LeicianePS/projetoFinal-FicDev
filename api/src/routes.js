const { Router, request } = require('express');

const { UsuarioController } = require('./controllers/usuario')
const { BatalhaoController } = require('./controllers/batalhao');
const { RegiaoController } = require('./controllers/regiao');

const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();


const usuarioController = new UsuarioController();
const batalhaoController = new BatalhaoController();
const regiaoController = new RegiaoController();


routes.post('/usuario', usuarioController.register);
routes.post('/usuario-login', usuarioController.login);
routes.get('/usuarios', authMiddleware, usuarioController.getAll);
routes.delete('/usuario/:id', authMiddleware, usuarioController.delete);
routes.put('/usuario/:id',authMiddleware, usuarioController.update);
routes.get('/usuario/:id', authMiddleware, usuarioController.getById);
routes.get('/usuario-perfil/:cpf', authMiddleware, usuarioController.getByCPF);
routes.post('/usuario-filtro', authMiddleware, usuarioController.usuariosFiltro);


routes.post('/batalhao', authMiddleware, batalhaoController.create);
routes.get('/batalhoes', authMiddleware, batalhaoController.getAll);
routes.delete('/batalhao/:id', authMiddleware, batalhaoController.delete);
routes.put('/batalhao/:id', authMiddleware, batalhaoController.update);
routes.post('/batalhao-filtro', authMiddleware, batalhaoController.batalhoesFiltro);
routes.get('/batalhao/:id', authMiddleware, batalhaoController.getById);
routes.get('/batalhoes-cr', authMiddleware, batalhaoController.batalhoesCR);
routes.get('/batalhoes-total', authMiddleware, batalhaoController.batalhoesTotal);

routes.get('/efetivo-cr', authMiddleware, batalhaoController.efetivoCR);
routes.get('/efetivo-total', authMiddleware, batalhaoController.efetivoTotal);


routes.post('/regiao', authMiddleware, regiaoController.create);
routes.get('/regioes', authMiddleware, regiaoController.getAll);
routes.delete('/regiao/:id_regiao', authMiddleware, regiaoController.delete);
routes.put('/regiao/:id_regiao', authMiddleware, regiaoController.update);
routes.get('/regiao/:id_regiao', authMiddleware, regiaoController.getById);
routes.post('/regiao-filtro', authMiddleware, regiaoController.regioesFiltro);


module.exports = { routes };
