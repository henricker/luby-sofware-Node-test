import { DataTypes } from 'sequelize';
import connection from '../../database/index';

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



export default Repository;