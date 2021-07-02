import { DataTypes } from "sequelize";
import connection from "../../database";
import User from "./User.model";

const FollowerFollowing = connection.define("follower_following", {
  following_id: {
    type: DataTypes.INTEGER,
    references: { 
      model: User,
      key: 'id'
    }
  },
  follower_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
},
{
  timestamps: true,
  underscored: true
});



export default FollowerFollowing;