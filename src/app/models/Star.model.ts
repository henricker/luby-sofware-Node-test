import { DataTypes } from 'sequelize';
import connection from '../../database/index';

const Star = connection.define('stars', {
  user_id: DataTypes.INTEGER,
  repository_id: DataTypes.INTEGER
},
{
  timestamps: true,
  underscored: true
});

export default Star;