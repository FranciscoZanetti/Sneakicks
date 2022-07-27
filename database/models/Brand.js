module.exports = function(sequelize, dataTypes){
    let alias = "Brand";

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
        tableName: "brands",
        timeStamps: false
    }

    let Brand = sequelize.define(alias, cols, config);

    Brand.associate = function(models){
        Brand.hasMany(models.Product,
            {
                as: "products",
                foreignKey: "id_brand"
            });
    }

    return Brand;
}