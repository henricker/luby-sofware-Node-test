import { DataTypes } from "sequelize";
import connection from "../../database";
import User from "./User.model";


const Token = connection.define("tokens", {
  user_id: {
    type: DataTypes.INTEGER,
    references: { 
      model: User,
      key: 'id'
    }
  },
  request_date: {
    type: DataTypes.DATE,
    field: 'created_at'
  }
},
{
  timestamps: true,
  underscored: true
});

Token.belongsTo(User, {
  as: 'user'
});

export default Token;