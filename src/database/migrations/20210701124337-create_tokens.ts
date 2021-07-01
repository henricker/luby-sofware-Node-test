import { QueryInterface, DataTypes } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
     await queryInterface.createTable('tokens', { 
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },

       user_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',

         references: {
           model: { tableName: 'users'},
           key: 'id'
         }
       },

       created_at: {
         type: DataTypes.DATE,
         allowNull: false,
       }
      
    });
  },

  down: async (queryInterface: QueryInterface) => {
     await queryInterface.dropTable('tokens'); 
  }
};
