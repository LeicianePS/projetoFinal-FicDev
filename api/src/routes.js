const { Router, request } = require('express');

const { FoodController } = require('./controllers/food');
const { UserController } = require('./controllers/user');
const { NutricionistaController } = require('./controllers/nutricionista');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const foodController = new FoodController();
const userController = new UserController();
const nutricionistaController = new NutricionistaController();

routes.post('/food', authMiddleware, foodController.create);
routes.get('/foods', authMiddleware, foodController.getAll);
routes.delete('/food/:id', authMiddleware, foodController.delete);
routes.put('/food/:id', authMiddleware, foodController.update);

routes.post('/nutricionista', authMiddleware, nutricionistaController.create);
routes.get('/nutricionistas', authMiddleware, nutricionistaController.getAll);
routes.delete('/nutricionista/:id', authMiddleware, nutricionistaController.delete);
routes.put('/nutricionista/:id', authMiddleware, nutricionistaController.update);


routes.post('/register', userController.register);
routes.post('/login', userController.login);

module.exports = { routes };
