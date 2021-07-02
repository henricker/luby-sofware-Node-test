import { DataTypes } from 'sequelize';
import connection from '../../database/index';

const Follow = connection.define('follow', {
  follower: DataTypes.INTEGER,
  followed: DataTypes.INTEGER
}, 
{
  timestamps: true,
  tableName: 'follow',
  underscored: true
});


export default Follow;