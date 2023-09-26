const { Model, DataTypes } = require("sequelize");

class MilitarModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            nascimento: DataTypes.DATEONLY,
            posto: DataTypes.STRING,
            salario_atual: DataTypes.FLOAT,
            matricula: DataTypes.INTEGER,
            id_batalhao: {
                type: DataTypes.INTEGER,
            }
        }, {
            tableName: 'militar',
            modelName: 'MilitarModel',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models) {
        this.belongsTo(models.BatalhaoModel, { foreignKey: 'id_batalhao'})
    }
}

module.exports = { MilitarModel };
