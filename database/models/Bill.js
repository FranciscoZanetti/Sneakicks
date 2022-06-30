module.exports = function(sequelize, dataTypes){
    let alias = "Bill";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        customer: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        datetime: {
            type: dataTypes.DATE,
            allowNull: false
        },
        id_cart: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "bills",
        timeStamps: false
    }

    let Bill = sequelize.define(alias, cols, config);

    Bill.associate = function(models){
        Cart.belongsTo(models.Cart,
            {
                as: "cart",
                foreignKey: "id_cart",
                onDelete: "restrict",
                onUpdate: "restrict"
            });
    }

    return Bill;
}