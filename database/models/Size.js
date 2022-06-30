module.exports = function(sequelize, dataTypes){
    let alias = "Size";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        number: {
            type: dataTypes.DECIMAL(2,2).UNSIGNED,
            allowNull: false
        }
    }

    let config = {
        tableName: "sizes",
        timeStamps: false
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