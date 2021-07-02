import { DataTypes } from "sequelize";
import connection from "../../database";
import Follow from "./Follow.model";

const User = connection.define(
  "users",
  {
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    username: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
  },
  {
    timestamps: true,
    underscored: true
  },
);

User.belongsToMany(User, {
  through: Follow,
  as: 'followers',
  foreignKey: 'followed'
});

User.belongsToMany(User, {
  through: Follow,
  as: 'followings',
  foreignKey: 'follower'
})



export default User;
