import { Sequelize } from 'sequelize';
import { DATABASE, USERNAME, PASSWORD, options } from '../configs/mysql.config';

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, options);

export default sequelize;
