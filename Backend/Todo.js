const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Todo = sequelize.define(
    "Todo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "todo",
        timestamps: false,
    }
);

module.exports = Todo;
