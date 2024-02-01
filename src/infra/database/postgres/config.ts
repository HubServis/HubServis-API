import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "../../seeds/MainSeeder";
import { config } from "dotenv";

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  entities: ["./src/infra/database/postgres/models/**.ts"],
  migrations: ["./src/infra/database/migrations"],
  synchronize: true,
  logging: false,
  seeds: [MainSeeder]
};

export const AppDataSource = new DataSource(options);

export default new DataSource(options).initialize();

