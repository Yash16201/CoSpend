const { Connection } = require('pg');
const { Model, DataTypes } = require('sequelize');

const ConnectionModel = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    friendId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'blocked'),
        allowNull: false,
        defaultValue: 'pending',
    },
}

module.exports = (sequelize) => {
  const Connection = sequelize.define("Connection", ConnectionModel, {
    tableName: 'connections',
    timestamps: true,
    underscored: false,
  });

  Connection.associate = (models) => {
    Connection.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });

    Connection.belongsTo(models.User, {
      foreignKey: 'friendId',
      as: 'friend',
      onDelete: 'CASCADE',
    });
  };

  return Connection;
};