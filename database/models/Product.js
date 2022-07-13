module.exports = function(sequelize, dataTypes){
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        brand_name: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        colorwave: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        whole_name: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        price_original: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false
        },
        price_final: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false
        },
        release_year: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        shoe_condition: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        story: {
            type: dataTypes.STRING(5000),
            allowNull: false
        },
        main_picture: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        picture1: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        picture2: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        picture3: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        picture4: {
            type: dataTypes.STRING(200),
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
        tableName: "products",
        timeStamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.hasMany(models.Review,
            {
                as: "reviews",
                foreignKey: "id_product"
            });

        Product.belongsToMany(models.Size,
            {
                as: "sizes",
                through: models.Product_Size,
                foreignKey: "product",
                otherKey: "size",
                // timeStamps: false
            });
        Product.hasMany(models.Product_Size,
            {
                as: "product_size",
                foreignKey: "product"
            });
        Product.belongsToMany(models.User,
            {
                as: "users",
                through: models.Product_Cart,
                foreignKey: "product_id",
                otherKey: "user_id",
                // timeStamps: false
            });
        Product.hasMany(models.Product_Cart,
            {
                as: "product_cart",
                foreignKey: "product_id"
            });
    }

    return Product;
}