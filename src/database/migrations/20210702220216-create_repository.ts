import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
     await queryInterface.createTable('repositories', { 
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

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      description: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },

      created_at: {
        type: DataTypes.STRING,
        allowNull: false
      },

      updated_at: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('repositories');
  }
};
