module.exports = function(sequelize, dataTypes){
    let alias = "Product_Cart";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        units: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        size: {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        bought: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
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
        tableName: "products_carts",
        timeStamps: false
    }

    let Product_Cart = sequelize.define(alias, cols, config);

    Product_Cart.associate = function(models){
        Product_Cart.belongsTo(models.User,
            {
                as: "user",
                foreignKey: "user_id",
                onDelete: "cascade",
                onUpdate: "cascade"
            });
        Product_Cart.belongsTo(models.Product,
            {
                as: "product",
                foreignKey: "product_id",
                onDelete: "cascade",
                onUpdate: "cascade"
            });
    }

    return Product_Cart;
}