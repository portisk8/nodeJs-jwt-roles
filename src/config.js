import * as dotenv from "dotenv";

dotenv.config();

export default {
  secret: process.env.SECRET_KEY,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbServer: process.env.DB_SERVER,
  dbDatabase: process.env.DB_DATABASE,
};
