module.exports = function(sequelize, dataTypes){
    let alias = "Cart";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        charges: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false
        },
        total_amount: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: true
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
        tableName: "carts",
        timeStamps: false
    }

    let Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models){
        Cart.belongsTo(models.User,
            {
                as: "user",
                foreignKey: "id_user"
            });
        Cart.hasOne(models.Bill,
            {
                as: "bill",
                foreignKey: "id_cart"
            });
        Cart.belongsToMany(models.Product,
            {
                as: "products",
                through: models.Product_Cart,
                foreignKey: "cart_id",
                otherKey: "product_id",
                // timeStamps: false
            });
        Cart.hasMany(models.Product_Cart,
            {
                as: "product_cart",
                foreignKey: "cart_id"
            });
    }

    return Cart;
}