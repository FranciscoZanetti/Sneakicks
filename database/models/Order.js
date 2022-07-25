module.exports = function(sequelize, dataTypes){
    let alias = "Order";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        charges: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
            allowNull: true
        },
        total_amount: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        user_fullname: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        id_shipping: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        }
    }

    let config = {
        tableName: "orders",
        timeStamps: false
    }

    let Order = sequelize.define(alias, cols, config);

    Order.associate = function(models){
        Order.belongsTo(models.User,
            {
                as: "user",
                foreignKey: "id_user",
                onDelete: "set null",
                onUpdate: "cascade"
            });
        Order.belongsTo(models.Shipping,
            {
                as: "shipping",
                foreignKey: "id_shipping",
                onDelete: "no action",
                onUpdate: "no action"
            });
        // Order.hasOne(models.Bill,
        //     {
        //         as: "bill",
        //         foreignKey: "id_cart"
        //     });
        // Order.belongsToMany(models.Product,
        //     {
        //         as: "products",
        //         through: models.Product_Cart,
        //         foreignKey: "cart_id",
        //         otherKey: "product_id",
        //         // timeStamps: false
        //     });
        // Cart.hasMany(models.Product_Cart,
        //     {
        //         as: "product_cart",
        //         foreignKey: "cart_id"
        //     });
    }

    return Order;
}