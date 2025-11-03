const { Model, DataTypes } = require('sequelize');

const UserModel = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
}

module.exports = (sequelize) => {
  const User = sequelize.define("User", UserModel, {
    tableName: 'users',
    timestamps: true,
    underscored: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Connection, {
      foreignKey: 'userId',
      as: 'connections',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Connection, {
      foreignKey: 'friendId',
      as: 'friends',
      onDelete: 'CASCADE',
    });
  };

  return User;
};