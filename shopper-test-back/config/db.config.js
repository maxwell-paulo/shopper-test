import * as dotenv from "dotenv";
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

try {
  await sequelize.authenticate();

} catch (err) {
  throw new Error(`Não foi possível conectar ao banco de dados: ${err.message}`);
}

export { sequelize };
