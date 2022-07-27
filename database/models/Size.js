module.exports = function(sequelize, dataTypes){
    let alias = "Size";

    let cols = {
        id: {
            type: dataTypes.DECIMAL(3,1),
            primaryKey: true,
            allowNull: false
        },
        number: {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        centimeters: {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName: "sizes",
        timeStamps: false,
        createdAt: false,
        updatedAt: false
    }

    let Size = sequelize.define(alias, cols, config);

    Size.associate = function(models){
        Size.belongsToMany(models.Product,
            {
                as: "products",
                through: models.Product_Size,
                foreignKey: "size",
                otherKey: "product",
                // timeStamps: false
            });
        Size.hasMany(models.Product_Size,
            {
                as: "product_size",
                foreignKey: "size"
            });
    }

    return Size;
}