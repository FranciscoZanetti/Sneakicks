module.exports = function(sequelize, dataTypes){
    let alias = "Review";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        stars: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        text: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        id_product: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "reviews",
        timeStamps: false
    }

    let Review = sequelize.define(alias, cols, config);

    Review.associate = function(models){
        Review.belongsTo(models.Product,
            {
                as: "product",
                foreignKey: "id_product",
                onDelete: "cascade",
                onUpdate: "cascade"
            });
    }

    return Review;
}