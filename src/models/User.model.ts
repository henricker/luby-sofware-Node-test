import { DataTypes } from "sequelize";
import connection from "../database";

const User = connection.define(
  "users",
  {
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    username: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING
  },
  {
    timestamps: true,
    underscored: true
  },
);

export default User;
