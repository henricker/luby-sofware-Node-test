import { DataTypes } from "sequelize";
import connection from "../../database";
import FollowerFollowing from "./FollowerFollowing.model";

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

//Auto relationship, user has followers
User.belongsToMany(User, {
  through: FollowerFollowing,
  as: 'followers',
  foreignKey: 'follower_id'
});

//Auto relationship, user follow others users
User.belongsToMany(User, {
  through: FollowerFollowing,
  as: 'followings',
  foreignKey: 'following_id'
});


export default User;
