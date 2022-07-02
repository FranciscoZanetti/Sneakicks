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
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "products_carts",
        timeStamps: false
    }

    let Product_Cart = sequelize.define(alias, cols, config);

    Product_Cart.associate = function(models){
        Product_Cart.belongsTo(models.Cart,
            {
                as: "cart",
                foreignKey: "cart_id",
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