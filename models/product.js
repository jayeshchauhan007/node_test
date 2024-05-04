const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Product = Sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        product_type: {
            type: DataTypes.ENUM,
            values: ['Print Product', 'Promotional Product'],
            validate: {
                notEmpty: true,
                isIn: {
                    args: [['Print Product', 'Promotional Product']],
                    msg: "Enter valid value"
                }
            }
        },
        product_image: {
            type: DataTypes.STRING
        }
    });
    return Product;
}