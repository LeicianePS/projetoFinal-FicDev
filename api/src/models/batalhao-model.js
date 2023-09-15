const { Model, DataTypes } = require("sequelize");

class BatalhaoModel extends Model {
    static init(sequelize) {
        super.init({

            nome_batalhao: DataTypes.STRING,
            data_fundacao: DataTypes.DATEONLY,
            comandante: DataTypes.STRING,
            tipo: DataTypes.STRING,
            efetivo: DataTypes.INTEGER,
            missao_valores: DataTypes.TEXT,
            contato: DataTypes.TEXT,
            comando_regional: DataTypes.STRING,
            status: DataTypes.STRING,
            id_regiao: {
                type: DataTypes.INTEGER,
                
            }
        }, {
            sequelize,
            tableName: 'batalhao',
            modelName: 'BatalhaoModel',
            timestamps: false
        });
    }


    static associate(models) {
        this.belongsTo(models.RegiaoModel, { foreignKey: 'id_regiao'})
    }
}

module.exports = { BatalhaoModel };
