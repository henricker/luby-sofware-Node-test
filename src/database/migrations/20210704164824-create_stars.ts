import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('stars', { 
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
          model: 'users',
          key: 'id'
        },

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      repository_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
          model: 'repositories',
          key: 'id'
        },

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('stars');
  }
};
