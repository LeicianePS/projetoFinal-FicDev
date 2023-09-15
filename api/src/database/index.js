const { Sequelize } = require('sequelize');
const configDatabase = require('./config');


const { UsuarioModel } = require('../models/usuario-model');
const { BatalhaoModel } = require('../models/batalhao-model');
const { RegiaoModel } = require('../models/regiao-model');

const database = new Sequelize(configDatabase);


UsuarioModel.init(database);
BatalhaoModel.init(database);
RegiaoModel.init(database);


// relationships
BatalhaoModel.associate(database.models);
RegiaoModel.associate(database.models);


module.exports = database;
