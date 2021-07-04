import { DataTypes } from 'sequelize';
import connection from '../../database/index';
import Star from './Star.model';
import User from './User.model';

const Repository = connection.define("repositories", {
  user_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  description: DataTypes.STRING(500),
  public: DataTypes.BOOLEAN,
  slug: DataTypes.STRING
},
{
  timestamps: true,
  underscored: true,
  tableName: 'repositories'
});

Repository.hasMany(Star, { foreignKey: 'repository_id', as: 'stars'  });


export default Repository;