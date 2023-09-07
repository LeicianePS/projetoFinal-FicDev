const { Router, request } = require('express');

const { FoodController } = require('./controllers/food');
const { UserController } = require('./controllers/user');
const { NutricionistaController } = require('./controllers/nutricionista');

const { UsuarioController } = require('./controllers/usuario')
const { BatalhaoController } = require('./controllers/batalhao');
const { RegiaoController } = require('./controllers/regiao');

const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const usuarioController = new UsuarioController();
const foodController = new FoodController();
const userController = new UserController();
const nutricionistaController = new NutricionistaController();

const batalhaoController = new BatalhaoController();
const regiaoController = new RegiaoController();



routes.post('/usuario', authMiddleware, usuarioController.register);
routes.post('/usuario-login', usuarioController.login);
routes.get('/usuarios', authMiddleware, usuarioController.getAll);
routes.delete('/usuario/:id', authMiddleware, usuarioController.delete);
routes.put('/usuario/:id', authMiddleware, usuarioController.update);


routes.post('/food', authMiddleware, foodController.create);
routes.get('/foods', authMiddleware, foodController.getAll);
routes.delete('/food/:id', authMiddleware, foodController.delete);
routes.put('/food/:id', authMiddleware, foodController.update);

routes.post('/nutricionista', authMiddleware, nutricionistaController.create);
routes.get('/nutricionistas', authMiddleware, nutricionistaController.getAll);
routes.delete('/nutricionista/:id', authMiddleware, nutricionistaController.delete);
routes.put('/nutricionista/:id', authMiddleware, nutricionistaController.update);


// routes.post('/batalhao', authMiddleware, batalhaoController.create);
// routes.get('/batalhaoes', authMiddleware, batalhaoController.getAll);
// routes.delete('/batalhao/:id', authMiddleware, batalhaoController.delete);
// routes.put('/batalhao/:id', authMiddleware, batalhaoController.update);

// routes.post('/regiao', authMiddleware, regiaoController.create);
// routes.get('/regiaoes', authMiddleware, regiaoController.getAll);
// routes.delete('/regiao/:id', authMiddleware, regiaoController.delete);
// routes.put('/regiao/:id', authMiddleware, regiaoController.update);

routes.post('/batalhao', batalhaoController.create);
routes.get('/batalhoes', batalhaoController.getAll);
routes.delete('/batalhao/:id', batalhaoController.delete);
routes.put('/batalhao/:id', batalhaoController.update);

routes.post('/regiao', regiaoController.create);
routes.get('/regioes', regiaoController.getAll);
routes.delete('/regiao/:id_regiao', regiaoController.delete);
routes.put('/regiao/:id_regiao', regiaoController.update);


routes.post('/register', userController.register);
routes.post('/login', userController.login);

module.exports = { routes };
