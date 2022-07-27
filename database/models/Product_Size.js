module.exports = function(sequelize, dataTypes){
    let alias = "Product_Size";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        size: {
            type: dataTypes.DECIMAL(3,1),
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
        tableName: "products_sizes",
        timeStamps: false
    }

    let Product_Size = sequelize.define(alias, cols, config);

    Product_Size.associate = function(models){
        Product_Size.belongsTo(models.Product,
            {
                as: "product_size",
                foreignKey: "size",
                onDelete: "cascade",
                onUpdate: "cascade"
            });
        Product_Size.belongsTo(models.Size,
            {
                as: "size_id",
                foreignKey: "size",
                onDelete: "cascade",
                onUpdate: "cascade"
            });
    }

    return Product_Size;
}