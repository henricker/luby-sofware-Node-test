import { QueryInterface, DataTypes } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
     await queryInterface.createTable('follower_following', { 
       id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },

       follower_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',

         references: {
           model: { tableName: 'users'},
           key: 'id'
         }
       },

       following_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',

         references: {
           model: { tableName: 'users' },
           key: 'id'
         }
       },

       created_at: {
         type: DataTypes.DATE,
         allowNull: false,
       },
       
       updated_at: {
         type: DataTypes.DATE,
         allowNull: false
       }
      
    });
  },

  down: async (queryInterface: QueryInterface) => {
     await queryInterface.dropTable('follower_following'); 
  }
};
