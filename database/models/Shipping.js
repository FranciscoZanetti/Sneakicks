module.exports = function(sequelize, dataTypes){
    let alias = "Shipping";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        cost: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName: "shippings",
        timestamps: false
    }

    let Shipping = sequelize.define(alias, cols, config);

    Shipping.associate = function(models){
        Shipping.hasMany(models.Order,
            {
                as: "order",
                foreignKey: "id_shipping",
                onDelete: "no action",
                onUpdate: "no action"
            });
    }

    return Shipping;
}