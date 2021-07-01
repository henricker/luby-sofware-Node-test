import { Sequelize } from 'sequelize';
import { development } from '../config/db.config';


const connection = new Sequelize(development);
(async () => {

  try { 
    await connection.authenticate();
    console.log("Success to connect database");
  } catch(err) {
    console.log("Error on connect database");
  }

})();

export default connection;