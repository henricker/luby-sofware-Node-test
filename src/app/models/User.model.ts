import { DataTypes } from "sequelize";
import connection from "../../database";
import Follow from "./Follow.model";
import Repository from "./Repository.model";
import Token from "./Token.model";

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

User.hasMany(Repository, { foreignKey: 'user_id', as: 'repositories' });

User.belongsToMany(User, {
  through: Follow,
  as: 'followers',
  foreignKey: 'followed'
});

User.belongsToMany(User, {
  through: Follow,
  as: 'followings',
  foreignKey: 'follower'
});

export default User;
