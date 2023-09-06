const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            telefone: DataTypes.STRING,
            matricula: DataTypes.INTEGER,
        }, {
            tableName: 'user',
            modelName: 'UserModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { UserModel };
