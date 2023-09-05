const { Model, DataTypes } = require("sequelize");

class NutricionistaModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            crn: DataTypes.TEXT,
        }, {
            sequelize,
            tableName: 'nutricionista',
            modelName: 'NutricionistaModel',
            timestamps: false
        });
    }
}

module.exports = { NutricionistaModel };