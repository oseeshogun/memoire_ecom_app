require('dotenv').config();

interface EnvConfig {
  PORT: string | number;
  STATIC: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  MYSQL_HOST: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DB: string;
  MYSQL_PORT: number;
}

const config: EnvConfig = {
  ...process.env,
  PORT: process.env.PORT || 5500,
  STATIC: './public',
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DB: process.env.MYSQL_DB,
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT) || 5432
};

export default config;
