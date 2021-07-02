import { QueryInterface, DataTypes } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
     await queryInterface.createTable('follow', {
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },

       follower: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
           model: 'users',
           key: 'id'
         }
       },

       followed: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
           model: 'users',
           key: 'id'
         }
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
     await queryInterface.dropTable('follow'); 
  }
};
