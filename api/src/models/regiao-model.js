const { Model, DataTypes } = require("sequelize");

class RegiaoModel extends Model {
    static init(sequelize) {
        super.init({
            id_regiao: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            nome_regiao: DataTypes.STRING,
            populacao: DataTypes.INTEGER,
            cidadesbairros_atuacao: DataTypes.TEXT
        }, {
            sequelize,
            tableName: 'regiao',
            modelName: 'RegiaoModel',
            timestamps: false
        });
    }


    static associate(models) {
        this.hasOne(models.BatalhaoModel, { foreignKey: 'id_regiao'})
    }
}

module.exports = { RegiaoModel };
