"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Message, { onDelete: "cascade", hooks: true });
        }
    }
    User.init({
        email: DataTypes.STRING,
        pseudo: DataTypes.STRING,
        avatar: DataTypes.STRING,
        password: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
        bio: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};