const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { FoodModel } = require('../models/food-model');
const { UserModel } = require('../models/user-model');
const { NutricionistaModel } = require('../models/nutricionista-model');

const { UsuarioModel } = require('../models/usuario-model');
const { BatalhaoModel } = require('../models/batalhao-model');
const { RegiaoModel } = require('../models/regiao-model');

const database = new Sequelize(configDatabase);

FoodModel.init(database);
UserModel.init(database);
NutricionistaModel.init(database);

UsuarioModel.init(database);
BatalhaoModel.init(database);
RegiaoModel.init(database);


// relationships
BatalhaoModel.associate(database.models);
RegiaoModel.associate(database.models);


module.exports = database;
