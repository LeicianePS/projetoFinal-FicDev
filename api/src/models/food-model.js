const { Model, DataTypes } = require("sequelize");

class FoodModel extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.TEXT,
            unidadeMedida: DataTypes.TEXT
        }, {
            sequelize,
            tableName: 'food',
            timestamps: false
        });
    }
}

module.exports = { FoodModel };
