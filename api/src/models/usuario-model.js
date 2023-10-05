const { Model, DataTypes } = require("sequelize");

class UsuarioModel extends Model {
    static init(database) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            telefone: DataTypes.STRING,
            matricula: DataTypes.INTEGER,
            perfil: DataTypes.STRING,
        }, {
            tableName: 'usuario',
            modelName: 'UsuarioModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { UsuarioModel };
