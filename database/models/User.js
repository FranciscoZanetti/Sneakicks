module.exports = function(sequelize, dataTypes){
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
            type: dataTypes.STRING(45),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(200),
            allowNull: false
        }
    }

    let config = {
        tableName: "users",
        timeStamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Cart,
            {
                as: "carts",
                foreignKey: "id_user"
            });
    }

    return User;
}