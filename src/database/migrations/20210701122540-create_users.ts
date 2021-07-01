import { DataTypes, QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
     await queryInterface.createTable('users', { 
       id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
       },
       
       name: {
         type: DataTypes.STRING,
         allowNull: false
       },

       username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
       },

       email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
       },

       bio: {
         type: DataTypes.STRING(1000),
         allowNull: true
       },

       state: {
         type: DataTypes.STRING,
         allowNull: false
       },

       city: {
         type: DataTypes.STRING,
         allowNull: false
       },

       avatar: {
         type: DataTypes.STRING,
         allowNull: true
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
     await queryInterface.dropTable('users');
  }
};
