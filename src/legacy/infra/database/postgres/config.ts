import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { config } from "dotenv";

config();

export const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  database: process.env.POSTGRES_DB,
  // host: process.env.POSTGRES_HOST,
  // port: Number(process.env.POSTGRES_PORT),
  // username: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASS,
  seeds: ["./src/infra/seeding/seeds/index.ts"],
  migrations: ["./src/infra/database/migrations"],
  entities: ["./src/infra/database/postgres/models/**.ts"],
  synchronize: true,
  logging: false,
};

export const AppDataSource = new DataSource(options);

export default new DataSource(options).initialize();
