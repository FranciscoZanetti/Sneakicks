let User = function(sequelize, dataTypes){
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(200),
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
        tableName: "users",
        timeStamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Order,
            {
                as: "orders",
                foreignKey: "id_user"
            });
        User.belongsToMany(models.Product,
            {
                as: "products",
                through: models.Product_Cart,
                foreignKey: "user_id",
                otherKey: "product_id",
                // timeStamps: false
            });
        User.hasMany(models.Product_Cart,
            {
                as: "product_cart",
                foreignKey: "user_id"
            });
    }

    return User;
}

module.exports = User;