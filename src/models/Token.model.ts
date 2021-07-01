import { DataTypes } from "sequelize/types";
import connection from "../database";


const Token = connection.define("tokens", {
  user_id: DataTypes.INTEGER
},
{
  timestamps: true,
  underscored: true
});

export default Token;